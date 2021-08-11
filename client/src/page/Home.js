import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useStoreState,useStoreActions } from 'easy-peasy'

import axios from 'axios'

// copoments
import File from '../components/File'
import FileUploadForm from '../components/File/FileUploadForm'
// partials
import WifiHost from '../components/partial/WifiHost'
// popup
import MovePopUp from '../components/partial/MovePopUp'

import '../style/home.scss'

export default ()=>{
    // store
    const { 
        files
    } = useStoreState(state => ({
        files:state.files,
        // current dir path
        directoryPath:state.directoryPath,
    }))
    // action
    const { 
        setFiles,
        setDirectoryPath,
    } = useStoreActions(actions => ({
        setFiles:actions.addFiles,
        setDirectoryPath:actions.setDirectoryPath,


    }))

    const location = useLocation()
    
    const [isLoading,setIsLoading] = useState(true)
    const [uploadingFiles,setUploadingFiles] = useState([])


    // get files from server
    const getFiles = url =>{
        setIsLoading(true)
        axios
            .get(url)
            .then(res =>{
                // set store
                setFiles(res.data.files)
                
                setDirectoryPath(res.data.directoryPath)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err.response);
            })
    }

    // on init
    useEffect(()=>{
        getFiles(`/api/get-files${location.search}`)

    },[location])

    
    return (
        <div className="home">
            {/* host address */}
            <WifiHost />
            {/* move popup */}
            <MovePopUp />
            
            {/* form */}
            <FileUploadForm uploadingFiles={(files) => setUploadingFiles(files)}  />

            {/* file */}
            <File 
            files={files} 
            isLoading={isLoading} 
            uploadingFiles={uploadingFiles}

            />
            
        </div>
    )
}