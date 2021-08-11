const Router = require('express').Router()


// controller
const { indexController } = require('../controller')
const { videoStream } = require('../controller/stream')
const { getExtIconController } = require('../controller/extIcon')
const { 
    uploadFile,
    downloadFile,
    sendFile,
    deleteFile,
    deleteAny,
    deleteDirectory,
    createDirectory,
    moveFile,
    getFileContent,
    getFileExists
} = require('../controller/file')

// textarea
const { getTextController,setTextController } = require('../controller/textarea')

// wifi
const { getWifiHostAddressController } = require('../controller/wifi')

// doc
const getApiDoc = require('../get_api_doc')



//////////////// GET Files ////////////////////
// @GET
Router.get('/get-files',indexController)

//////////////// GET test file exists ////////////////////
// @GET
Router.get('/get-file-exists',getFileExists)

//////////////// GET Stream ////////////////////

// @GET Video Stream
Router.get('/get-video-stream',videoStream)
Router.get('/get-audio-stream',videoStream)


//////////////// GET Ext Icon ////////////////////
// @GET
Router.get('/get-ext-icon',getExtIconController)

//////////////// Download File  ////////////////////
Router.get('/download',downloadFile)

//////////////// Send File  ////////////////////
Router.get('/send-file',sendFile)

//////////////// POST File Upload ////////////////////
// @POST
Router.post('/upload-file',uploadFile);

//////////////// Delete File  ////////////////////
// @DELETE
Router.delete('/delete-file',deleteFile);

//////////////// Delete Any  ////////////////////
// @DELETE
Router.delete('/delete-any',deleteAny);


//////////////// Delete Directory  ////////////////////
// @DELETE
Router.delete('/delete-directory',deleteDirectory);

//////////////// Create Directory  ////////////////////
// @POST
Router.post('/create-directory',createDirectory);

//////////////// Move File  ////////////////////
// @POST
Router.post('/move-file',moveFile);


//////////////// Get File Content  ////////////////////
// @GET
Router.get('/get-file-content',getFileContent);


//////////////// Textarea File  ////////////////////
// @GET
Router.get('/get-text',getTextController)
// @POST
Router.post('/set-text',setTextController)

//////////////// GET API Doc ////////////////////
// @GET
Router.get('/get-doc',(req,res)=>{
    res.status(200).json({message:'Get Doc',api:getApiDoc})
})

//////////////// GET Wifi Mobile Host ////////////////////
// @GET 
Router.get('/get-wifi-host-address',getWifiHostAddressController)

module.exports = Router
