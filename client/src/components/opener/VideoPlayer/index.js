import React, { useEffect,useState } from 'react'

import { useLocation,useParams } from 'react-router-dom'

// helper
import { getLocal,setLocal } from '../../helper'

import '../../../style/video-player.scss'

export default () =>{
    const location = useLocation();
    const params = useParams()
    const [ videoUrl,setVideoUrl ] = useState(false);
    const [ title,setTitle ] = useState('');

    const [ volume,setVolume ] = useState(1)

    useEffect(()=>{
        setTitle(params.title);
        
        setVideoUrl(`/api/get-video-stream${location.search}`)

        initVideoConfig()
    },[])

    ////////button/////////////////
    const videoDownload = () => {
        const params = new URLSearchParams(videoUrl.replace('/api/get-video-stream',''))
        const path = params.get('path')
        let a = document.createElement('a')
        a.href = `/api/download?name=${title}&&path=${path}`
        a.setAttribute('target','__blank')
        a.click()
    }

    const videoLinkCopy = () => {
        let clientHost = window.location.origin;
        let value = `${clientHost}${videoUrl}`

        // window.navigator.clipboard.writeText(value).then(()=>{
        //     // success
        //     // alert
        //     window.alert('Video Link Copied')
            
        // })
        // .catch(err => window.alert(err))
        let input = document.createElement('input')
        // input.setAttribute('type','hidden')
        input.value = value;
        document.body.appendChild(input)
        input.select()
        let res = document.execCommand('copy')
        if(res){
            window.alert('Video Link Copied')
            document.body.removeChild(input)
        }

    }
    ////////////////////////////////

    const initVideoConfig = () => {
        let volume = getLocal('video-volume')
        if(volume){
            volume = parseInt(volume) / 100;
            setVolume(volume)
        }
    }


    // video event
    const videoVolumeChange = e => {
        let volume = e.target.volume;
        let volumePer = Math.round( volume * 100) 
        setLocal('video-volume',volumePer)
    }

    const videoLoaded = e => {
        e.target.volume = volume;

        let resume = localStorage.getItem('video-resume-time')
        if(resume){
            let result = JSON.parse(resume)
            // check current video
            if(result.title == title){
                // is current video
                if(result.time != e.target.duration){
                    e.target.currentTime = result.time;

                }
            }
        }
    }

    const videoDurationChange = e => {
        let currentTime = e.target.currentTime;
        // set local
        localStorage.setItem('video-resume-time',JSON.stringify({title:title,time:currentTime}))
    }


    return (
        <div className="video-player">
            <h2 className="header">{title}</h2>
            <button onClick={() => window.history.back()} className="btn">Go Back</button>
            <br />
            <br />
            {videoUrl ?
            <video 
                controls={true} 
                autoPlay={true} 
                src={videoUrl} 
                controlsList={'nodownload'}
                onLoadedMetadata={videoLoaded}
                onVolumeChange={videoVolumeChange}
                onTimeUpdate={videoDurationChange}
                ></video>
        :
        <div></div>
        }

        {/* download button */}
        <div className="btn" onClick={videoDownload} >Download</div>
        <div className="btn" onClick={videoLinkCopy} >Copy Link</div>
        </div>
    )
}