import React,{ useState } from 'react'
import { Link } from 'react-router-dom'

import SideNav from './SideNav'

import '../../style/navbar.scss'

export default function Navbar(){

    const [ sideNavIsOpen,setSidenavIsOpen ] = useState(false);

    const openSideNav = () => {
        setSidenavIsOpen(true)
    }

    const sideNavClose = () => {
        setSidenavIsOpen(false)
    }

    return (
        <div className="navbar">
            {/* side nav */}
            <SideNav 
            open={sideNavIsOpen}
            onClose={sideNavClose}
            />
            {/* side nav button */}
            <div 
            onClick={openSideNav}
            className="side-nav-button">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="brand">
                <Link to="/" >Uploader</Link>
            </div>
            <ul className="list">
                <li><Link to="/get-doc">API Doc</Link></li>
                <li><Link to="/textarea">Textarea</Link></li>
            </ul>

        </div>
    )
}