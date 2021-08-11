import { createStore,action,thunk } from 'easy-peasy'
import axios from 'axios';

const store = createStore({
    
    directoryPath:null,
    // set direcotry path
    setDirectoryPath:action((state,payload)=>{
        state.directoryPath = payload;
    }),
    // files
    files:[],
    // set files
    addFiles:action((state,payload)=> {
        state.files = payload
    }),
    addFile:action((state,payload)=> {
        state.files.unshift(payload)
    }),

    renameFile:action((state,{filePath,oldName,newName})=> {
        let res = state.files.map(file => {
            if(file.path == filePath){
                return {
                    ...file,
                    name:newName,
                    path:filePath.replace(oldName,newName)
                }
            }else{
                return file
            }
        })

        // set files
        state.files = res;
    }),

    removeFile:action((state,filePath)=> {
        let res = state.files.filter(f => f.path != filePath)
        state.files = res;
    }),

    // get from server
    getFiles:thunk((actions,payload)=>{
        axios
            .get(payload).then(res =>{
                actions.addFiles(res.data.files)
                actions.setDirectoryPath(res.data.directoryPath)
            })
            .catch(err => console.log(err.response))
    }),
    // move menu
    moveMenuTitle:null,
    showMoveMenu:false,
    
    // action
    setMoveMenuTitle:action((state,payload)=>{
        state.moveMenuTitle = payload
    }),
    setShowMoveMenu:action((state,payload)=>{
        state.showMoveMenu = payload
    }),
    // check box
    checkedFiles:[],
    
    // action
    setCheckedFiles:action((state,payload) => {
        state.checkedFiles = payload;
    }),
    addCheckedFile:action((state,filePath)=> {
        state.checkedFiles.push(filePath)
    }),
    removeCheckedFile:action((state,filePath)=> {
        let res = state.checkedFiles.filter(p => p != filePath)
        state.checkedFiles = res;
    })
})


export default store;