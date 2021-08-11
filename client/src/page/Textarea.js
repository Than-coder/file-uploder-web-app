import React,{ useState,useEffect } from 'react'

import axios from 'axios'

import '../style/textarea.scss'

export default () => {
    const [ text,setText ] = useState('')

    
    useEffect(()=>{
        axios.get('/api/get-text')
        .then(({data})=>{
            setText(data.text)
        })
        .catch(err => console.log(err.response))
    },[])

    const textChange = e =>{
        setText(e.target.value)
    }

    const save = () => {
        axios.post('/api/set-text',{text},{
            headers:{'Content-Type':'application/json'}
        })
        .then(({data})=>{
            console.log(data);
        })
        .catch(err => console.log(err.response))
    }

    return (
        <div className="text-area">
            <textarea  
            style={style}
            autoFocus={true}
            onChange={textChange} value={text} ></textarea>

            <div className="button-group">
                <button className="btn" onClick={save} >Save</button>
            </div>
        </div>
    )
}


const style = {
    width: '100%',
    height: '80vh',
    padding:'10px'
}