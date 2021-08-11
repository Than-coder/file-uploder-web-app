const fs = require('fs')

// helper
const helper = require('../helper')

function videoStream(req,res){
    let query = req.query;
    let range = req.headers.range;
    let filePath = null;

    if(query.path){
        // find replace query ampersand
        let filepath = helper.getFindReplaceAmpersand(query.path)
        // check is file
        if(helper.checkFileExists(filepath)){
            // is file
            filePath = filepath;
        }
    }
    
    // file not found!!!
    if(filePath == null){
        res.status(404).json({message:'stream file not found!'})
        return false;
    }
    

    // file size
    let fileSize = fs.statSync(filePath).size;

    // range
    if(!range){
        // not range
        res.writeHead(200,{'Content-Length':fileSize})
        fs.createReadStream(filePath).pipe(res)
    }else{
        // is range
        let parts = range.replace('bytes=','').split('-')
        let start = parseInt(parts[0]);
        let end = parts[1] ? parseInt(parts[1]) : fileSize -1;
        
        // chunk size
        let chunkSize = end - start +1;
        // file read stream
        let fileReadStream = fs.createReadStream(filePath,{start,end})
        // console.log('start',start);
        // console.log('end',end);
        // console.log('chunk',chunkSize);
        // console.log('file size',fileSize);
        // head
        const head = {
            'Content-Length':chunkSize,
            'Content-Range':`bytes ${start}-${end}/${fileSize}`,
            'Content-Type':'video/mp4'
        }

        res.writeHead(206,head)
        fileReadStream.pipe(res)
    }
}




module.exports = {
    videoStream
}