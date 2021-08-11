const fs = require('fs')
const mime = require('mime-types')
const path =require('path')
const os = require('os')

function checkPathExists(filePath){
    try {
        let res = fs.existsSync(filePath)
        return  res;

    } catch (error) {
        console.log('checkPathExists Error');
        console.log(error);
        return false;
    }
}


function checkDirExists(filePath){
    try {
        // check path
        if(!checkPathExists(filePath)) throw 'file path not exists';

        let res = fs.statSync(filePath).isDirectory()
        return res
        
    } catch (error) {
        console.log('checkDirExists Error');
        console.log(error);
        return false;
    }
}

function checkFileExists(filePath){
    try {
        // check path
        if(!checkPathExists(filePath)) throw 'file path not exists';
        
        let res = fs.statSync(filePath).isFile()
        return res
        
    } catch (error) {
        console.log('checkFileExists Error');
        console.log(error);
        return false;
    }
}

function createDir(filePath){
    try {
        let res = fs.mkdirSync(filePath)
        return  res
        
    } catch (error) {
        console.log('createDir Error');
        console.log(error);
        return false;
    }
}

function getFileExt(filePath){
    try {
        let res;
        if(fs.statSync(filePath).isDirectory()){
            // is folder && directory
            res = 'folder';
        }else{
            res = mime.lookup(filePath)
            // console.log(res);
            // if false
            if(!res){
                // check another check
                let filename = path.basename(filePath)
                if(/\.py$/.test(filename)){
                    // python
                    res = 'python'
                }else if(/\.desktop$/.test(filename)){
                    // linux desktop file
                    res = 'desktop'
                }
            }
            
    
        }
        return res;
        
    } catch (error) {
        console.log('getFileExt Error');
        console.log(error);
    }
}

function getFileSize(filePath){
    try {
        let size = fs.statSync(filePath).size;
        return size;
        
    } catch (error) {
        console.log('getFileSize Error');
        console.log(error);
        return false
    }
}

function getFileFormatBytes(fileSize){
    
    number = 0
    power = 1024
    powerLabel = {0:'Bytes',1:'KB',2:'MB',3:'GB',4:'TB'}
    while(fileSize > power){
        fileSize /= power;
        number += 1;
    }
    return `${fileSize.toFixed(2)} ${powerLabel[number]}`
}

function getFiles(filePath){
    let fileData = []
    try {
        if(fs.existsSync(filePath)){
            let files = fs.readdirSync(filePath)
            for(let f of files){
                let fileSize = getFileSize(`${filePath}/${f}`);
                let type = getFileExt(`${filePath}/${f}`)
                fileData.push({
                    name:f,
                    path:`${filePath}/${f}`,
                    ext:type,
                    type:type,
                    // check directory or  file
                    size: checkFileExists(`${filePath}/${f}`) ? getFileFormatBytes(fileSize) : ''
                })
            }
            // console.log(fileData);
            return fileData

        }else{
            // is not exists dir
            // create dir
            createDir(filePath)
            return fileData;

        }
    } catch (error) {
        console.log('getFiles Error');
        console.log(error);
    }
}


function deleteFile(filePath){
    try {
        fs.unlinkSync(filePath)
        return true
    } catch (error) {
        console.log('deleteFile Error');
        console.log(error);
        return false;
    }
}


function deleteDirectory(dirPath){
    try {
        
        fs.rmSync(dirPath,{force:true,recursive:true})
        return true
    } catch (error) {
        console.log('deleteDirectory Error');
        console.log(error);
        return false;
    }
}

function deleteAny(filePath){
    try {
        if(fs.statSync(filePath).isFile()){
            // is file
            deleteFile(filePath)
        }else{
            // is dir
            deleteDirectory(filePath)
        }
        return true;
    } catch (error) {
        console.log('deleteAny Error');
        console.log(error);
        return false;
    }
}


function createDirectory(dirPath){
    try {
        fs.mkdirSync(dirPath)
        return true

    } catch (error) {
        console.log('createDirectory Error');
        console.log(error);
        return false;
    }
}

function moveFile(oldPath,newPath){
    try {
        fs.renameSync(oldPath,newPath)
        return true

    } catch (error) {
        console.log('moveFile Error');
        console.log(error);
        return false;
    }
}


// wifi
function getWifiHostAddress(){
    try {
        let hostAddress = 'localhost'
        let net = os.networkInterfaces()

        if(net.wlp11s0){
            // mobile host address
            hostAddress = net.wlp11s0[0].address;
        }else{
            // default address
            if(net.lo[0]){
                hostAddress = net.lo[0].address;
            }
            
        }

        return hostAddress

    } catch (error) {
        console.log('getWifiHostAddress error');
        console.log(error);
        return false;
    }
}

// query ampersand
function getFindReplaceAmpersand(str){
    if(str){
        str = str.replace(/---ampersand---/gm,'&')
    }
    return str;
}






module.exports = {
    getFiles,
    checkDirExists,
    checkFileExists,
    checkPathExists,
    deleteFile,
    deleteAny,
    deleteDirectory,
    createDirectory,
    moveFile,
    // wifi
    getWifiHostAddress,
    getFindReplaceAmpersand
}