import React,{ useState,useEffect } from 'react'
import { useParams,useLocation } from 'react-router-dom'

import axios from 'axios'


export default () => {
    const location = useLocation()
    const params = useParams()
    
    const [ filename,setFilename ] = useState('') 
    const [ text,setText ] = useState('')

    
    useEffect(()=>{
        setFilename(params.name)
        axios.get(`/api/get-file-content${location.search}`)
        .then(({data})=>{
            setText(data.content)
        })
        .catch(err => console.log(err.response))
    },[])


    const textChange = e =>{
        setText(e.target.value)
    }

    const save = () => {
        // axios.post('/api/set-text',{text},{
        //     headers:{'Content-Type':'application/json'}
        // })
        // .then(({data})=>{
        //     console.log(data);
        // })
        // .catch(err => console.log(err.response))
        console.log('save text');
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