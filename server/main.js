const express = require('express')
const path = require('path')
const open = require('open')

// config
const config = require('../config')

const app = express()
// helper
const { getWifiHostAddress } = require('./helper')


// static
app.use(express.static(path.join(__dirname,'public')))

// req.body
app.use(express.json())

// router
app.use('/api',require('./route/api'))

// all route
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})

let host = 'localhost'

if(getWifiHostAddress()){
    host = getWifiHostAddress()
}
let url = `http://${host}:${config.serverPort}`

app.listen(config.serverPort,()=> console.log(`server running on port ${url}`))

// open browser
let isOpen = process.argv.find(name => name == 'open')
if(isOpen){
    // open 
    (async ()=>{
        await open(url)
    })()
}

