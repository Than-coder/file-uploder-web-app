const multer = require('multer')

// helper
const helper = require('../helper')


//////////////////// Upload File /////////////////////////////
const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,req.query.path)
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
}),
fileFilter:function(req,file,cb){
    let query = req.query;
    
    if(query.path == '' || query.path == undefined){
        // is error
        cb('(path) Query Not Found')
    }else{
        // check path is dir
        if(helper.checkDirExists(query.path)){
            // is dir 
            cb(null,true)
        }else{
            // not dir
            cb('path(directory) is not exists')
        }
    }

}}).single('file')

// upload server
function uploadFile(req,res){
    try {

        upload(req,res,err =>{
            if(err) return res.status(400).json({message:err})
            // success
            res.status(201).json({message:'Upload File',file:req.file})
        })


        
    } catch (error) {
        res.status(400).json({message:_error})
    }

}

//////////////////// Delete File /////////////////////////////
function deleteFile(req,res){
    let path = req.query.path;
    try {
        if(path == '' || path == undefined) throw '(path) Query Not Found!!!'

        // check file path
        if(helper.checkFileExists(path)){
            if(helper.deleteFile(path)){
                res.status(200).json({message:'Delete File',file_path:path});
            }else{
                throw 'File Delete Error'
            }
        }else{
            throw 'File Path Not Found!!!'
        }

    } catch (error) {
        res.status(404).json({message:error})
    }
}


//////////////////// Delete Directory /////////////////////////////
function deleteDirectory(req,res){
    let path = req.query.path;
    try {
        if(path == '' || path == undefined) throw '(path) Query Not Found!!!'

        // check file path
        if(helper.checkDirExists(path)){
            if(helper.deleteDirectory(path)){
                res.status(200).json({message:'Delete Directory',directory_path:path});
            }else{
                throw 'Directory Delete Error'
            }
        }else{
            throw 'Directory Path Not Found!!!'
        }

    } catch (error) {
        res.status(404).json({message:error})
    }
}

//////////////////// Delete Any File /////////////////////////////
function deleteAny(req,res){
    let path = req.query.path;
    try {
        if(path == '' || path == undefined) throw '(path) Query Not Found!!!'

        // check file path
        if(helper.deleteAny(path)){
            res.status(200).json({message:'Delete Directory',directory_path:path});
        }else{
            throw 'Delete Error'
        }

    } catch (error) {
        res.status(404).json({message:error})
    }
}

//////////////////// Create Directory /////////////////////////////
function createDirectory(req,res){
    let path = req.body.path;
    let dirName = req.body.directoryName;
    let dirPath = `${path}/${dirName}`
    try {
        if(path == '' || path == undefined) throw '(path) Query Not Found!!!'

        // check file path
        if(!helper.checkDirExists(dirPath)){
            // not found another dir
            if(helper.createDirectory(dirPath)){
                res.status(200).json({message:'Create Directory',directory_path:dirPath});
            }else{
                throw 'Directory Create Error'
            }
        }else{
            throw 'Directory Already Exists!!!'
        }

    } catch (error) {
        res.status(404).json({message:error})
    }
}

//////////////////// Move File /////////////////////////////
function moveFile(req,res){
    let oldPath = req.body.oldPath;
    let newPath = req.body.newPath;
    try {
        if(oldPath == undefined || newPath == undefined) throw '(path) Query Error!!!'

        if(helper.moveFile(oldPath,newPath)){
            res.status(200).json({message:'Move (Directory&File)',oldPath,newPath});
        }else{
            throw 'Move Delete Error'
        }

    } catch (error) {
        res.status(404).json({message:error})
    }
}


//////////////////// Download File /////////////////////////////
function downloadFile(req,res){
    let path = req.query.path;
    let name = req.query.name;
    // replace ampersand
    path = helper.getFindReplaceAmpersand(path)
    name = helper.getFindReplaceAmpersand(name)
    try {
        if (path == '' && path == undefined) throw 'Path query Not Found!!!';
        // check exists
        if(!helper.checkFileExists(path)) throw 'File Path Not Found!!!' 

        // send file
        res.download(path,name)


    } catch (error) {
        res.status(404).json({message:'Download File',error})
    }
}

//////////////////// Send File /////////////////////////////
function sendFile(req,res){
    let filePath = req.query.path;
    try {
        if (filePath == '' && filePath == undefined) throw 'Path query Not Found!!!';
        // send file
        res.sendFile(filePath)


    } catch (error) {
        res.status(404).json({message:'Send File',error})
    }
}

//////////////////// Get File Content /////////////////////////////
function getFileContent(req,res){
    let filePath = req.query.path;
    try {
        if (filePath == '' && filePath == undefined) throw 'Path query Not Found!!!';
        // send file
        let content = fs.readFileSync(filePath,{encoding:'utf-8'})
        
        res.status(200).json({message:'Get File Content',content})
        
    } catch (error) {
        res.status(404).json({message:'Get File Content',error})
    }
}


function getFileExists(req,res){
    let filePath = req.query.path;
    let exists = false;
    try {
        if (filePath == '' && filePath == undefined) throw 'Path query Not Found!!!';
        
        if(helper.checkFileExists(filePath)){
            exists = true;
        }
        
        res.status(200).json({message:'Get File Content',exists})
        
    } catch (error) {
        res.status(404).json({message:'Get File Content',error})
    }
}


module.exports = {
    uploadFile,
    downloadFile,
    sendFile,
    deleteFile,
    deleteAny,
    moveFile,
    deleteDirectory,
    createDirectory,
    getFileContent,
    getFileExists
}