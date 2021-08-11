

function getFileFormatBytes(size,isLabel=true){
    let number = 0;
    let power = 1024;
    let label = {0:'Bytes',1:'KB',2:'MB',3:'GB',4:'TB'}
    
    while(size > power){
        size /= power;
        number ++;
    }

    return `${size.toFixed(2)} ${isLabel ? label[number] :''}`
}

function setLocal(key,value){
    window.localStorage.setItem(key,value)
    return true
}

function getLocal(key){
    let res = window.localStorage.getItem(key)
    if(res){
        return res;
    }else{
        return null;
    }
}

function setFindReplaceAmpersand(str){
    let groups = str.split('&&')
    for(let i=0;i < groups.length;i++){
        groups[i] = groups[i].replace(/\&/gm,'---ampersand---')
    }
    str = groups.join('&&')
    return str
}

// query ampersand
function getFindReplaceAmpersand(str){
    if(str){
        str = str.replace(/---ampersand---/gm,'&')
    }
    return str;
}



export  {
    getFileFormatBytes,
    getLocal,
    setLocal,
    setFindReplaceAmpersand,
    getFindReplaceAmpersand
}