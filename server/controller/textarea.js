const fs = require('fs')

// config
const config = require('../../config')
// helper
const helper = require('../helper')


function getTextController(req,res){
    try {
        // check file exists
        if(!helper.checkFileExists(config.textPath)){
            // not exists
            fs.writeFileSync(config.textPath,'')
        }
        let text = fs.readFileSync(config.textPath,{
            encoding:'utf-8'
        });
        res.status(200).json({message:'Get Text',text})
        
    } catch (error) {
        res.status(400).json({message:'Get Text',error})
    }
}


function setTextController(req,res){
    try {
        
        fs.writeFileSync(config.textPath,req.body.text)

        res.status(201).json({message:'Set Text'})
        
    } catch (error) {
        res.status(400).json({message:'Set Text',error})
    }
}


module.exports = {
    getTextController,
    setTextController
    
}