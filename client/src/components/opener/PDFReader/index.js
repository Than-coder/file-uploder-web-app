import React, { useEffect,useState } from 'react'

import { useLocation,useParams } from 'react-router-dom'

import '../../../style/pdf-reader.scss'

export default () =>{
    const location = useLocation();
    const params = useParams()
    
    const  [ pdfUrl,setPdfUrl ] = useState(false);
    const  [ title,setTitle ] = useState('');

    useEffect(()=>{
        setTitle(params.title);
        setPdfUrl(`/api/send-file${location.search}`)
        
    },[])

    return (
        <div className="pdf-reader">
            <h2 className="header">{title}</h2>
            <button onClick={() => window.history.back()} className="btn">Go Back</button>
            <br />
            <br />
            {pdfUrl ? <iframe src={pdfUrl} ></iframe> :''}
        </div>
    )
}