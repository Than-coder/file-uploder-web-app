// config
const { serverPort } = require('../../config')
// helper
const { getWifiHostAddress } = require('../helper')

function getWifiHostAddressController(req,res){
    try {
        let hostAddress = 'localhost'

        if(getWifiHostAddress()){
            // mobile host address
            hostAddress = getWifiHostAddress()
        }

        res.status(200).json({message:'Get Wifi',address:`http://${hostAddress}:${serverPort}`})

    } catch (error) {
        res.status(400).json({message:'Get Wifi',error})
    }
}


module.exports = {
    getWifiHostAddressController
}