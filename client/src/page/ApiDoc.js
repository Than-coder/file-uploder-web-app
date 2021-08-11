import React,{ useState,useEffect } from 'react'
import axios from 'axios'



export default () => {
    const [ doc,setDoc ] = useState('')


    useEffect(()=>{
        axios.get('/api/get-doc')
            .then(({data})=>{
                setDoc(JSON.stringify(data.api,null,'\t'));
                // setDoc(data.message)
            })
    },[])

    return (
        <div className="api-doc"
        style={{marginTop:'4rem'}}
        >
            <textarea
            onChange={()=> {}}
            style={{width:'100%',height: '80vh'}}
            value={doc} ></textarea>
        </div>
    )
}