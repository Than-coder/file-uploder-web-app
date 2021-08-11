import React,{ useState } from 'react'



import '../../style/context-menu.scss'

export default (
    {
        showMenu,
        mouseXPosition,
        mouseYPosition,
        hideContextMenu,
        closeMenu,
        // context ment event
        deleteButtonClick,
        renameButtonClick,
        moveButtonClick,
        downloadButtonClick
    }
    )=>{

    const [ contextMenuWidth ] = useState('200px')
    const [ contextMenuHeight ] = useState('200px')


    if(!showMenu){
        return ''
    }else{
        return (
            <div 
                onClick={hideContextMenu}
                className="context-menu-wrapper">
                {/* content menu */}
                <div 
                style={{
                    top:mouseYPosition,
                    left:mouseXPosition,
                    width:contextMenuWidth,
                    height:contextMenuHeight
                    }}
                className="context-menu">
                {/* context menu */}
                {/* header */}
                <div className="header">
                    <div 
                    onClick={closeMenu}
                    className="close-btn">x</div>
                </div>
                <ul className="menu-list">
                    <li onClick={deleteButtonClick}>Delete</li>
                    <li onClick={renameButtonClick}>Rename</li>
                    <li onClick={moveButtonClick} >Move</li>
                    <li onClick={downloadButtonClick} >Download</li>
                </ul>
                </div>

            </div>
        )

    }

}