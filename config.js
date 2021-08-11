const path = require('path')
const os = require('os')


const config = {
    homeDir:path.join(os.homedir(),'Downloads','fileUploader'),
    showHiddenFile:false,
    // port
    serverPort:9000,
    clientPort:3000,
    clientBuildPath:path.join(__dirname,'server','public'),
    // textarea path
    textPath:path.join(__dirname,'text')
}



module.exports  = config;