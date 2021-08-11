import React,{ useState,useEffect,useCallback } from 'react'

import '../../style/pop-up-window.scss'

export default ({
    showMenu=false,
    title,
    text,
    onCancel,
    onOk
    

}) => {

    const [popupText,setText] = useState('')

    useEffect(()=> {
        setText(text)
    },[text])


    const onChange = e =>{
        setText(e.target.value)
    }

    const keyPress = e => {
        if(e.code == 'Enter'){
            onOk(popupText)
        }
    }


    if (showMenu){

        return (
            <div className="pop-up-window">
                <div className="content-wrapper">
                    <div className="content">
                            <div className="title">{title}</div>
                            <div className="text">
                                <input onKeyPress={keyPress} type="text" autoFocus={true} value={popupText} onChange={onChange} />
                                </div>
                            <div className="button-group">
                                <button className="btn" onClick={onCancel}>Cancel</button>
                                {/* <input type="submit" className="btn" onClick={() => onOk(popupText)} value="Ok" /> */}
                                <button className="btn" onClick={() => onOk(popupText)} >Ok</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return ''
    }
}