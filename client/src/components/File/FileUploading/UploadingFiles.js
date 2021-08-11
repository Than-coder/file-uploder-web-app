import React from 'react'

import UploadingFile from './UploadingFile'

import '../../../style/file-uploading.scss'

export default ({ uploadingFiles }) =>{


    return (
        <div 
        className="uploading-files"
        >
            
            {/* uploading file */}
            {uploadingFiles.map(file =>(
                <UploadingFile
                    key={file.name} 
                    file={file}  
                    />
            ))}
        </div>
    )
}