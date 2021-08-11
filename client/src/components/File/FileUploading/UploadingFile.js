import React,{useEffect,useState,useCallback} from 'react'

import axios from 'axios'

import { useStoreActions,useStoreState } from 'easy-peasy'

// helper
import { getFileFormatBytes } from '../../helper'

export default ({ file }) =>{
    
    // action
    const addFile = useStoreActions(actions => actions.addFile)
    const directoryPath = useStoreState(state => state.directoryPath)

    const [ isProgress,setIsProgress ] = useState(false)
    const [ uploadedFileSize,setUploadedFileSize ] = useState(0)
    const [ progressPer,setProgressPer ] = useState(0)
    const [ showFile,setShowFile ] = useState(false)
    
    // upload cancel
    const CancelToken = axios.CancelToken;
    const [ cancel,setCancel ] = useState({})

    // upload progress bar
    const fileUploadProgess = e =>{
        setIsProgress(true)
        setUploadedFileSize(e.loaded)

        // to per
        let uploadPer = Math.round((e.loaded / e.total ) * 100)
        setProgressPer(uploadPer)
        // reset per to 0
        if(progressPer == 100){
            setTimeout(()=> setProgressPer(0),2000)
        }
    }

    // file upload send server
    const fileUpload = (directoryPath,file) =>{

        let formData = new FormData()
        formData.append('file',file)
        
        axios.post(`/api/upload-file?path=${directoryPath}`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress:fileUploadProgess,
            cancelToken:new CancelToken(function executor(c){
                setCancel({cancel:c})
                
            })
        })
        // uploaded success
        .then(res =>{
            // add file
            let file = res.data.file;
            let _file = {
                type:file.mimetype,
                name:file.filename,
                path:file.path,
                size:file.size
            }
            let filePath = file.path.replace(`/${file.filename}`,'')
            let params = new URLSearchParams(window.location.search)
            let currentDir = params.get('path')
            if(currentDir){
                if(filePath == currentDir){
                    addFile(_file)
    
                }
            }else{
                // not found
                addFile(_file)
            }

            // done
            setIsProgress(false)
            setShowFile(false)
        })
        // upload error
        .catch(err =>{
            console.log(err.response);
            setIsProgress(false)
            // cancel
            if(axios.isCancel(err)){
                console.log('Request Canceled');
                // send server delete file
                axios.delete(`/api/delete-file?path=${directoryPath}/${file.name}`)
                .then(res =>{
                    // delete file
                    setShowFile(false)

                })
                .catch(err =>{
                    console.log('delete file error');
                    console.error(err.response);
                })
                
            }
            
        })
        
    }

    // file upload cancel
    const uploadCancel = () =>{
        cancel.cancel()
    }

    useEffect(()=>{
        
        // check file exists
        axios
            .get(`/api/get-file-exists?path=${directoryPath}/${file.name}`)
            .then(({data})=> {
                if(!data.exists){
                    // show upload file
                    setShowFile(true)
                    // not exists
                    fileUpload(directoryPath,file)
                }
            })
            .catch(error => console.log(error.response))

    },[])

    if (showFile) {
        return (
        <div className="body">
            <div className="file-name-wrapper">
                {/* file extension */}
                <div className="logo">
                    <img src={`/api/get-ext-icon?ext_name=${file.type}`} alt="logo" />
                </div>
                {/* file name */}
                <div className="name">{file.name}</div>
            </div>
            <div className="type">
                {isProgress ? 
                    // uploading
                    `${getFileFormatBytes(uploadedFileSize,false)}/${getFileFormatBytes(file.size)}`
                :
                    // uploaded
                    getFileFormatBytes(file.size)
                }
            </div>

            {/* progress bar */}
            {
                isProgress ?
                // uploading
            <div className="progress">
                <div className="bar" style={{width:`${progressPer}%`}}></div>
            </div>
            
            :
            // uploaded
            ''}

            {/* cancel button */}
            {
                isProgress ? 
                <div className="cancel-button">
                <button className="btn" onClick={uploadCancel}>Cancel</button>
            </div>
            :''}
        </div>
        )
    }else return ''
}