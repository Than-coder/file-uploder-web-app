import React,{ useState,useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// store
import { useStoreState,useStoreActions } from 'easy-peasy'

import { setFindReplaceAmpersand } from '../helper'


import PopUpWindow from '../partial/PopUpWindow'


import '../../style/content-list.scss'

export default ({
    // multiple button
    showFileCheckBox,
    multipleSelectButtonClick

    }) => {

    // history
    let history = useHistory()

    // store
    const { directoryPath,checkedFiles } = useStoreState(state => ({
        directoryPath:state.directoryPath,
        checkedFiles:state.checkedFiles
    }))
    // action
    const { 
        getFiles,
        setCheckedFiles,
        setShowMoveMenu,
        setMoveMenuTitle 
        
    } = useStoreActions(actions => ({
        getFiles:actions.getFiles,
        // checked file
        setCheckedFiles:actions.setCheckedFiles,
        setShowMoveMenu:actions.setShowMoveMenu,
        setMoveMenuTitle:actions.setMoveMenuTitle
    }))

    const addFile = useStoreActions(actions => actions.addFile)

    const [ showSearchInput,setShowInput ] = useState(false)
    const [ searchValue,setSearchValue ] = useState('')
    const [ showPopup,setIsShowPopup ] = useState(false)

    const searchButtonClick = () => {
        setShowInput(showSearchInput ? false: true)
    }

    const popupCancel = () => {
        // console.log('cancel');
        setIsShowPopup(false)
    }

    // button group
    const newFolderButtonClick = () => {
        setIsShowPopup(true)
    }

    // go back button
    const goBackPath = useCallback(()=>{
        let splitPath = directoryPath.split('/')
        splitPath.pop()
        let newPath = splitPath.join('/')
        history.push(`?path=${newPath}`)
    })


    // search input
    const searchInptChange = e => {
        setSearchValue(e.target.value)
        if(e.target.value == ''){
            // all
            getFiles(`/api/get-files?path=${directoryPath}`)
        }
        
    }
    // search
    const searchSubmit = e => {
        e.preventDefault()
        if(searchValue != ''){
            // search
            getFiles(`/api/get-files?path=${directoryPath}&&search_name=${searchValue}`)
        }else{
            // all
            getFiles(`/api/get-files?path=${directoryPath}`)
        }
    }

   
    // content list create folder
    const createFolder = (folderName) => {
        if(folderName == '') return false;
        // client
        let folder = {
            name:folderName,
            path:`${directoryPath}/${folderName}`,
            ext:'folder',
            type:'folder',
            size:''
        }
        // add client
        addFile(folder)
        // hide popup
        setIsShowPopup(false)
        // server
        axios.post('/api/create-directory',{
            path:directoryPath,
            directoryName:folderName
        },
        {
            headers:{'Content-Type':'application/json'}    
        })
        .then(res =>{
            console.log(res.data);
        })
        .catch(err => console.log(res.response))
    }
    
    // set fav 
    const setFav = () => {
        console.log(directoryPath);
    }


    // multiple delete button click
    const multipleSelectDeleteButtonClick = () => {
        // call server
        for(let file of checkedFiles){
            axios
                .delete(`/api/delete-any?path=${file.path}`)
                .then(res =>{
                    
                    getFiles(`/api/get-files${location.search}`)
                })
                .catch(err => console.log(err.response))
        }
        setCheckedFiles([])
    }

    // multiple move button click
    const multipleSelectMoveButtonClick = () => {
        setShowMoveMenu(true)
        setMoveMenuTitle('Multiple Files')
        // console.log(checkedFiles);
    }

    // multiple download
    const multipleSelectDownloadButtonClick = () => {
        for(let f of checkedFiles){
            let filepath = setFindReplaceAmpersand(f.path)
            let name = setFindReplaceAmpersand(f.name)
            let a = document.createElement('a')
            a.setAttribute('href',`/api/download?path=${filepath}&&name=${name}`)
            a.setAttribute('download',true)
            a.click()

        }

        setCheckedFiles([])
    }


    return (
        <div className="content-list">
            {/* pop up window */}
            <PopUpWindow 
            showMenu={showPopup}
            title={'New Folder'}
            text={'New Folder'}
            onOk={createFolder}
            onCancel={popupCancel}
            />
            {/* file path */}
            {/* <div className="file-path">
                {directoryPath ? directoryPath :''}
            </div> */}
            <input type="text" className="file-path" value={directoryPath ? directoryPath :''} disabled={true} />
            {/* search */}
            {showSearchInput ? 
                <div className="search">
                    <form onSubmit={searchSubmit}>
                        <input type="search" value={searchValue} placeholder="Search..." onChange={searchInptChange} />
                    </form>
                </div>
            :''}

            {/* buttons */}
            <div className="button-group">
                <button className="btn" onClick={goBackPath} >Go Back</button>
                <button className="btn" onClick={searchButtonClick} >{showSearchInput ? 'Hide Search':'Show Search'}</button>
                <button className="btn" onClick={multipleSelectButtonClick} >{showFileCheckBox ? 'Single Select' : 'Multiple Select'}</button>
                <button className="btn" onClick={newFolderButtonClick} >New Folder</button>
                <button className="btn" onClick={setFav} >Set Fav</button>
            </div>
            {/* multiple button group */}
            {showFileCheckBox ?
            <div>
                {/* header */}
                <div className="multiple-header">Multiple Select</div>
                <div className="multiple-btn-group">
                <button className="btn" onClick={multipleSelectDeleteButtonClick} >Delete</button>
                <button className="btn" onClick={multipleSelectMoveButtonClick} >Move</button>
                <button className="btn" onClick={multipleSelectDownloadButtonClick} >Download</button>
            </div>
            </div>
            :''}
        </div>
    )
}