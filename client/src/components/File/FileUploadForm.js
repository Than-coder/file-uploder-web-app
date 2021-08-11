import React,{ useState,useEffect } from 'react'


import '../../style/file-upload-form.scss'

export default ({uploadingFiles}) =>{
    const [files,setFiles ] = useState([])
    const [showUploadButton,setShowUploadButton ] = useState(false)

    const fileInput = e =>{
        let fileList = []
        for(let file of e.target.files){
            fileList.push(file)
        }
        // set files
        setFiles(fileList)

        if(e.target.files.length > 0){
            // show button
            setShowUploadButton(true)
        }else{
           // hide button
           setShowUploadButton(false) 
        }
    }


    // open file input
    const openFileInput = () =>{
        let input = document.createElement('input')
        input.setAttribute('type','file')
        input.setAttribute('multiple',true)
        input.click()

        input.addEventListener('input',fileInput)
        
    }
    
    // file drop
    useEffect(()=>{
        document.addEventListener('dragover', e => e.preventDefault())
        document.addEventListener('drop',getDropFile)
    },[])
    // drop file && upload file
    const getDropFile = e => {
        e.preventDefault()
        let files = []
        // console.log(e.dataTransfer.files)
        if(e.dataTransfer.files.length > 0){
            for(let file of e.dataTransfer.files){
                files.push(file)
            }
        }
        // set files
        setFiles(files)
        // files exists
        uploadingFiles(files)
        setFiles([])
        // hide upload button
        setShowUploadButton(false)
    }

    const submit = e =>{
        e.preventDefault()
        if(files.length > 0){
            // files exists
            uploadingFiles(files)
            setFiles([])
            // hide upload button
            setShowUploadButton(false)
        }

    }
    
    return (
        <div className="form">
            {/* <form onSubmit={submit}>
                <input type="file" multiple={true} onInput={fileInput} />
                <button className="btn">Upload</button>
            </form> */}
            <div className="file-input">
                <button className="btn file-button" onClick={openFileInput} >Uplod File</button>
                <label className="label">
                    {files.map(f => f.name).join(',')}
                </label>
            </div>
            <br />
            {showUploadButton ?
            <button className="btn upload-btn" onClick={submit}>Upload</button>
            :''    
        }
        </div>
    )
}