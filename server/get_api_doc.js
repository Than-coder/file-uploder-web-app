module.exports = {
    api:[
        // get files
        {
            method:'GET',
            url:'/api/get-files',
            query:['path','is_hidden_file','search_name']
            
        },// download
        {
            method:'GET',
            url:'/api/download',
            query:['path','name']
            
        },
        // video stream
        {
            method:'GET',
            url:'/api/get-video-stream',
            query:['path'],
            example:'?path=[file path]'
        },
        // audio stream
        {
            method:'GET',
            url:'/api/get-audio-stream',
            query:['path'],
            example:'?path=[file path]'
        },
        // get file extension icon
        {
            method:'GET',
            url:'/api/get-ext-icon',
            query:['ext_name'],
            example:'?ext_name=[icon ext]'
        },
        // upload file
        {
            method:'POST',
            url:'/api/upload-file',
            query:['path'],
            example:'?path=[file directory path]'
        },
        // delete file
        {
            method:'DELETE',
            url:'/api/delete-file',
            query:['path'],
            example:'?path=[file abs path]'
        },
        // delete any file
        {
            method:'DELETE',
            url:'/api/delete-any',
            query:['path'],
            example:'?path=[file abs path]'
        },
        // delete dir
        {
            method:'DELETE',
            url:'/api/delete-directory',
            query:['path'],
            example:'?path=[(directory&folder) abs path]'
        },
        // mkdir
        {
            method:'POST',
            url:'/api/create-directory',
            query:[],
            body:{
                path:'',
                directoryName:''
            }
        },
        // move
        {
            method:'POST',
            url:'/api/move-file',
            query:[],
            body:{
                oldPath:'',
                newPath:''
            }
        },
        // get file content
        {
            method:'GET',
            url:'/api/get-file-content',
            query:['path'],
            body:{}
        },
        // Textarea
        {
            method:'GET',
            url:'/api/get-text',
            query:[],
            body:{}
        },
        {
            method:'POST',
            url:'/api/set-text',
            query:[],
            body:{text:''}
        },
        // WIFI
        {
            method:'GET',
            url:'/api/get-wifi-host-address',
            query:[],
            body:{}
        }
    ]
}