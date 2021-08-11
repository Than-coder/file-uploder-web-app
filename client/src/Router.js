import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

// page
import Home from './page/Home'

// components
import Navbar from './components/navbar/Navbar'
import VideoPlayer from './components/opener/VideoPlayer'
import AudioPlayer from './components/opener/AudioPlayer'
import PDFReader from './components/opener/PDFReader'

// page
import Textarea from './page/Textarea'
import Text from './page/Text'

// doc
import ApiDoc from './page/ApiDoc'


export default function Router(){
    return (
        <BrowserRouter>
        <Navbar />
            <Switch>
                <Route exact path="/"  component={Home} />
                <Route exact path="/video/:title/"  component={VideoPlayer} />
                <Route exact path="/audio/:title/"  component={AudioPlayer} />
                <Route exact path="/pdf/:title/"  component={PDFReader} />
                <Route exact path="/textarea"  component={Textarea} />
                <Route exact path="/text/:name"  component={Text} />
                {/* api doc */}
                <Route path="/get-doc" component={ApiDoc} />
            </Switch>
        </BrowserRouter>
    )
}