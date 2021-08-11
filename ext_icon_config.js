const path = require('path')


const extDirPath = path.join(__dirname,'ext_icon')

const extConfig = {
    dirPath:extDirPath,
    defaultIcon:{
        name:'file.png'
    },
    icons:[
        {
            name:'apk.png',
            ext:'application/vnd.android.package-archive'
        },
        {
            name:'deb.png',
            ext:'application/x-debian-package'
        },
        {
            name:'desktop.png',
            ext:'desktop'
        },
        {
            name:'file.png',
            ext:'text'
        },
        {
            name:'folder.png',
            ext:'folder'
        },
        {
            name:'iso.png',
            ext:''
        },
        {
            name:'js.png',
            ext:'application/javascript'
        },
        {
            name:'json.png',
            ext:'application/json'
        },
        {
            name:'mp3.png',
            ext:'audio'
        },
        {
            name:'photo.png',
            ext:'image'
        },
        {
            name:'python.png',
            ext:'python'
        },
        {
            name:'sh.png',
            ext:'application/x-sh'
        },
        {
            name:'video.png',
            ext:'video'
        },
        {
            name:'zip.png',
            ext:'application/zip'
        },
        {
            name:'pdf.png',
            ext:'application/pdf'
        },
        // {   name:'java.png',
        //     ext:'text/x-java-source'
        // }
    ]
}



module.exports = extConfig;