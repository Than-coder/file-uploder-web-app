const { join } = require('path');
const path = require('path')


const extIconConfig = require('../../ext_icon_config')


function getExtIconController(req,res){
    let query = req.query;
    let ext_name = false;
    let ext_path = path.join(extIconConfig.dirPath,extIconConfig.defaultIcon.name)
    try {
        if (query.ext_name == '' || query.ext_name == undefined) throw '(ext_name) Query Not Found!!!';

        if(query.ext_name != 'false'){
            // is have
            ext_name = query.ext_name;
        }
        // check ext name
        if(ext_name != false){
            let icons = extIconConfig.icons;

            for(let icon of icons){
                // console.log(icon.ext.startsWith(ext_name),ext_name);
                
                if(ext_name.startsWith(icon.ext) && icon.ext != ''){
                    // is found && set icon path
                    ext_path = path.join(extIconConfig.dirPath,icon.name) 
                    break;
                }
            }
            
        }
        
        // return api stream
        res.sendFile(ext_path);
        // res.status(200).json({message:'Get Ext Icon',icon_path:ext_path})
        
    } catch (error) {
        console.log('error');
        res.status(403).json({message:error})
    }

}



module.exports = {
    getExtIconController
}