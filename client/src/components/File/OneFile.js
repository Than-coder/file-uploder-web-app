import React,{ useCallback,useState } from 'react'

import { useHistory } from 'react-router-dom'
// store
import { useStoreActions } from 'easy-peasy'

// helper
import { getFileFormatBytes,setFindReplaceAmpersand } from '../helper'

import '../../style/one-file.scss'

export default function OneFile(
    {
        file,
        openContextMenu,
        showCheckBox
    }){
    
    const history = useHistory()
    // store
    const { addCheckedFile,removeCheckedFile } = useStoreActions(actions => ({
        addCheckedFile:actions.addCheckedFile,
        removeCheckedFile:actions.removeCheckedFile
    }))
    // state
    const [ isCheck,setIsCheck ] = useState(false)

    const openFile = useCallback((file) => {
        console.log(file.type);
        let filename = file.name;
        let path = setFindReplaceAmpersand(file.path);
        if(file.ext == false){
            window.alert('Just Working...')
            return false;
        }
        // check file type
        if(file.type.startsWith('video')){
            // video
            history.push(`/video/${filename}/?path=${path}`)
        
        }else if(file.type.startsWith('audio')){
            // audio
            history.push(`/audio/${filename}/?path=${path}`)
        
        }else if(file.type.startsWith('folder')){
            // folder
            history.push(`/?path=${path}`)
        
        }else if(file.type.startsWith('application/pdf')){
            // pdf
            history.push(`/pdf/${filename}/?path=${path}`)
        
        }else if(file.type.startsWith('text') || file.type.startsWith('application/x-sh') || file.type.startsWith('desktop') ){
            // text
            history.push(`/text/${filename}/?path=${path}`)
        }
    })

    const clickCheckBox = file => {
        setIsCheck(isCheck ? false: true)
        if(isCheck == false){
            // store
            addCheckedFile(file)
        }else{
            // remove file path
            removeCheckedFile(file)
        }
    }

    return (
        
        <div className="body" 
            

            onClick={()=> !showCheckBox ? openFile(file):''} 
            onContextMenu={e => !showCheckBox ? openContextMenu(e,file.path):''}
            >
         
            <div className="file-name-wrapper">
                {/* check box */}
                {showCheckBox ?
                <div className="check-box">
                    <input type="checkbox" checked={isCheck} onChange={()=> clickCheckBox(file)} />
                </div>
                
                :''}

                {/* logo */}
                <div className="logo">
                    <img src={file.type.startsWith('image') ? `/api/send-file?path=${file.path}` : `/api/get-ext-icon?ext_name=${file.type}`} alt="logo" />
                </div>
                {/* name */}
                <div 
                className="name" 
                onSelect={e => console.log('select')}
                onClick={()=> showCheckBox ? openFile(file):''} 
                onContextMenu={e => showCheckBox ? openContextMenu(e,file.path):''}
                  
                >{file.name}</div>
            </div>
            <div className="type">
                {/* check number or string */}
                {typeof file.size == 'number' ?
                getFileFormatBytes(file.size)
                :
                // string
                file.size
                }
            </div>

            
        </div>
    )
}
