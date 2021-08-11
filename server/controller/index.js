// config 
const config = require('../../config')

const helper = require('../helper')


function indexController(req,res){
    let query = req.query;
    let filePath = config.homeDir;
    let isHiddenFile = config.showHiddenFile;
    let searchName = query.search_name;
    let files = []

    // check query
    if(query.path != '' && query.path != undefined){
        // check is directory
        if(helper.checkDirExists(query.path)){
            filePath = query.path
        }
    }

    // check hidden 
    if(query.is_hidden_file != '' && query.is_hidden_file != undefined){
        if(query.is_hidden_file == 'true'){
            isHiddenFile = true;
        }
    }
    
    // get all files
    files = helper.getFiles(filePath)
    

    

    // search files
    if(searchName != '' && searchName != undefined){
        // get search files
        files = files.filter(f => f.name.toUpperCase().indexOf(searchName.toUpperCase()) > -1)

    }

    // hidden files
    if(!isHiddenFile){
        // hide hiddenFiles
        files = files.filter(f => !f.name.startsWith('.'))
    }

 
    files.sort((a,b)=> a.name.localeCompare(b.name,undefined,{numeric:true}))

    // is folder
    files.sort((a,b)=> {
        if(a.type == 'folder'){
            return -1;
        }
        if(b.type == 'folder'){
            return 1;
        }

        return 0
    })

    res.status(200).json({message:'Get Files',directoryPath:filePath,files})
}





module.exports = {
    indexController
}