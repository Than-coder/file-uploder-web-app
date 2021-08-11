import React, { useEffect,useState } from 'react'

import { useLocation,useParams } from 'react-router-dom'

// helper
import { getLocal,setLocal } from '../../helper'

import '../../../style/audio-player.scss'

export default () =>{
    const location = useLocation();
    const params = useParams()
    const  [ audioUrl,setAudioUrl ] = useState(false);
    const  [ title,setTitle ] = useState('');
    const [ volume,setVolume ] = useState(1)

    useEffect(()=>{
        setTitle(params.title);
        setAudioUrl(`/api/get-audio-stream${location.search}`)
        // init
        initAudioConfig()
    },[])


    const initAudioConfig = () => {
        let volume = getLocal('audio-volume')
        if(volume){
            volume = parseInt(volume) / 100;
            setVolume(volume)
        }
    }


    // video event
    const audioVolumeChange = e => {
        let volume = e.target.volume;
        let volumePer = Math.round( volume * 100) 
        setLocal('audio-volume',volumePer)
    }

    const audioLoaded = e => {
        e.target.volume = volume;
    }

    return (
        <div className="audio-player">
            <h2 className="header">{title}</h2>
            <button onClick={() => window.history.back()} className="btn">Go Back</button>
            <br />
            <br />
            {audioUrl ?
            <audio 
                controls={true} 
                autoPlay={true} 
                src={audioUrl} 
                controlsList="nodownload"
                onVolumeChange={audioVolumeChange}
                onLoadedMetadata={audioLoaded}
                ></audio>
        :
        <div></div>
        }
        </div>
    )
}