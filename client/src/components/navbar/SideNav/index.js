import React from 'react'


import '../../../style/side-nav.scss'

export default ({open,onClose}) => {

    const onWrapperClick = e => {
        if(e.target.className == 'wrapper'){
            onClose()
        }
    }

    if(open){
        return (
            <div className="side-nav">
                <div 
                onClick={onWrapperClick}
                className="wrapper">
                    <div className="content">
                        <h3>Fav List</h3>
                        <ul className="list">
                            <li>
                                <a href="#">one</a>
                                <span className="delete">x</span>
                            </li>
                            <li>two</li>
                            <li>three</li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    }else return ''
}