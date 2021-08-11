import React from 'react'
import axios from 'axios'
import { useStoreState,useStoreActions } from 'easy-peasy'

import '../../style/move-popup.scss'

export default () => {

    // store
    const { 
        checkedFiles,
        directoryPath,
        showMoveMenu,
        moveMenuTitle
    } = useStoreState(state => ({
        // current dir path
        directoryPath:state.directoryPath,
        // move file
        checkedFiles:state.checkedFiles,
        showMoveMenu:state.showMoveMenu,
        moveMenuTitle:state.moveMenuTitle
    }))
    // action
    const { 
        setMoveFile,
        setShowMoveMenu,
        setCheckedFiles,
        getFiles
    } = useStoreActions(actions => ({
        // move file
        setMoveFile:actions.setMoveFile,
        setShowMoveMenu:actions.setShowMoveMenu,
        setCheckedFiles:actions.setCheckedFiles,
        // server
        getFiles:actions.getFiles
    }))


    // move menu
    const moveMenuCancel = () => {
        setShowMoveMenu(false)
        setMoveFile('')
    }

    const moveFile = (oldPath,newPath) =>{
        axios.post('/api/move-file',{
            oldPath,
            newPath
        },
        {
            headers:{'Content-Type':'application/json'}
        })
        .then(res =>{
            console.log(res.data);
            
        })
        .catch(err => console.log(err.response))
    }

    const moveMenuOk = () => {

        for(let file of checkedFiles){
            let oldPath = file.path;
            let newPath = `${directoryPath}/${file.name}`;
            moveFile(oldPath,newPath)
        }

        setCheckedFiles([])
        setShowMoveMenu(false)
        // success
        getFiles(`/api/get-files?path=${directoryPath}`)
        
    }
    
    if(showMoveMenu){
        return (
        <div className="move-popup">
            {/* title */}
            <div className="title">{moveMenuTitle}</div>
            {/* message */}
            <div className="button-group">
                <button className="btn" onClick={moveMenuOk}>Past Here</button>
                <button className="btn" onClick={moveMenuCancel}>Cancel</button>
            </div>

        </div>
    )

    }else return ''
}