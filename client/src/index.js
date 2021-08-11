import React from 'react'
import ReactDom from 'react-dom'


// app
import App from './App'

// style
import './style/index.scss'


ReactDom.render(<App/>,document.getElementById('app'))

// hide right click
// document.addEventListener('contextmenu',e => e.preventDefault())