import React,{ useState } from 'react'
import axios from 'axios'

import { useStoreActions } from 'easy-peasy'

import OneFile from './OneFile'
import UploadingFiles from './FileUploading/UploadingFiles'
import ContextMenu from './ContextMenu'
import ContentList from './ContentList'
// partials
import PopUpWindow from '../partial/PopUpWindow'
// helper
import { setFindReplaceAmpersand } from '../helper'

import '../../style/file.scss'

export default (
    {
    files,
    isLoading,
    uploadingFiles,
    })=>{
    
    
    // action
    const { 
        removeFile,
        renameFile,
        setShowMoveMenu,
        setMoveFile,
        setMoveMenuTitle
    } = useStoreActions(actions => (
        {
            removeFile:actions.removeFile,
            renameFile:actions.renameFile,
            // move menu
            setShowMoveMenu:actions.setShowMoveMenu,
            setMoveFile:actions.setMoveFile,
            setMoveMenuTitle:actions.setMoveMenuTitle
            
        }))


    const [ filePath,setFilepath ] = useState(null); 
    const [ showContextMenu,setShowContextMenu ] = useState(false)
    const [ mouseXPosition,setMouseXPosition ] = useState(false)
    const [ mouseYPosition,setMouseYPosition ] = useState(false)

    // popup
    const [ renameValue,setRenameValue ] = useState('')
    const [ showRenameMenu,setShowRenameMenu ] = useState(false)
    

    // show file check box
    const [ showFileCheckBox,setShowFileCheckBox ] = useState(false)
    
    ////////////////Context Menu////////////////
    // context menu
    const openContextMenu = (e,path) =>{
        e.preventDefault()

        let y = e.clientY;
        let x = e.clientX;

        setMouseXPosition(x)
        setMouseYPosition(y)
        setShowContextMenu(true)
        setFilepath(path)
    }

    const hideContextMenu = e =>{
        if(e.target.className == 'context-menu-wrapper'){
            setShowContextMenu(false);
        }
    }

    // context menu delete
    const deleteButtonClick = () => {
        if(filePath == null ) return window.alert('Delete File Path is Null')
        // send client
        removeFile(filePath)
        // hide menu
        setShowContextMenu(false)
        //send server
        axios
            .delete(`/api/delete-any?path=${filePath}`)
            .then(res =>{
                // if success
                // hide context menu
                setShowContextMenu(false)
                setFilepath(null)
            })
            .catch(err => console.log(err.response))
    }

    // downloadButtonClick
    const downloadButtonClick = () => {
        let path = setFindReplaceAmpersand(filePath)
        let name = setFindReplaceAmpersand(filePath.split('/').pop())
        // a link
        let a = document.createElement('a')
        a.setAttribute('href',`/api/download?path=${path}&&name=${name}`)
        a.setAttribute('download',true)
        a.click()
        // hide context menu
        setShowContextMenu(false)
    }

    // context menu rename
    const renameButtonClick = () => {
        if(filePath == null ) return window.alert('Delete File Path is Null')

        let splitPath = filePath.split('/');
        let name = splitPath[splitPath.length - 1];
        setRenameValue(name)
        setShowRenameMenu(true)
        setShowContextMenu(false)
       
    }
    // context menu move
    const moveButtonClick = () => {
        let filename = filePath.split('/').pop()
        setShowContextMenu(false)
        setShowMoveMenu(true)
        setMoveFile(filePath);
        setMoveMenuTitle(filename)
        
    }

    // rename popup
    const onOk = newName => {
        if(newName){
            let newPath = filePath.replace(renameValue,newName)
            // rename client
            renameFile({filePath,oldName:renameValue,newName})
            // hide rename menu
            setShowRenameMenu(false)
            // rename server
            axios
            .post(`/api/move-file`,{
                oldPath:filePath,
                newPath:newPath
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res =>{
                console.log(res.data);
                // success
                // hide context menu
                setShowContextMenu(false)
                setFilepath(null)
            })
            .catch(err => console.log(err.response))
        }
    }

    const onCancel = () => {
        setShowRenameMenu(false)
    }

   

     ////////////////check box////////////////
     const multipleSelectButtonClick = () => {
        setShowFileCheckBox(showFileCheckBox ? false : true)
    }
    


    return (
        <div className="file">
            
            {/* rename popup */}
            <PopUpWindow 
            showMenu={showRenameMenu}
            title={'Rename'}
            text={renameValue}
            onCancel={onCancel}
            onOk={onOk}
            />
            {/* context menu */}
            <ContextMenu  
                showMenu={showContextMenu} 
                mouseXPosition={mouseXPosition} 
                mouseYPosition={mouseYPosition} 
                hideContextMenu={hideContextMenu}
                closeMenu={()=> setShowContextMenu(false)}
                // event
                deleteButtonClick={deleteButtonClick}
                renameButtonClick={renameButtonClick}
                moveButtonClick={moveButtonClick}
                downloadButtonClick={downloadButtonClick}
                />
            {/* content list */}
            <ContentList 
                // multiple button
                showFileCheckBox={showFileCheckBox}
                multipleSelectButtonClick={multipleSelectButtonClick}
                />

            {/* header */}
            <div className="header">
                <h4 className="name">Name</h4>
                <h4 className="size">Size</h4>
            </div>
            {/* uploading files */}
            <UploadingFiles 
                uploadingFiles={uploadingFiles} 
                />

            {/* body */}

            {isLoading ?
                <h3>Loading...</h3>
            :
            files.length > 0 ? 
            // file have
            files.map(file =>(
                <OneFile 
                    key={file.name} 
                    file={file}  
                    openContextMenu={openContextMenu} 
                    showCheckBox={showFileCheckBox}
                    />
            ))
            :
            // file not found
            ''
            }

        </div>
    )
}