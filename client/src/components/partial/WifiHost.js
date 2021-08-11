import React,{ useState,useEffect } from 'react'

import axios from 'axios'



export default () => {
    const [ host,setHost ] = useState('localhost');

    const getHostAddress = (url) => {
        axios.get(url).then(({data})=>{
            setHost(data.address)
        })
        .catch(err => console.log(err.response))
    }

    useEffect(()=>{
        getHostAddress('/api/get-wifi-host-address')
    },[])
    
    return (
        <div className="host-address">
            <sub>Host: {host}</sub>
        </div>
    )
}