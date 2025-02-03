"use client"

import { useRef, useState } from 'react'
import React from 'react'
import dynamic from 'next/dynamic';
import { Input } from 'postcss';
import Image from 'next/image';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const Musicplayer = () => {

    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState(""); 
    const [volume, setVolume] = useState(1.0); 
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);


    const handlePlayPause = () => {
        setPlaying(!playing);
      };

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
      };


    const handleDuration = (duration) => {
        setDuration(duration);
      };
    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      };
    
  return (
    <div className='mt-20'>
     
        <ReactPlayer 
            ref={playerRef}
            url={url}  
            playing={playing}
            volume={volume}
            muted={false}
            controls={false}
            style={{ display: "none" }}
            onProgress={handleProgress}
            onDuration={handleDuration}
            config={{
                youtube: { playerVars: { playsinline: 1 } }, 
              }}
        />
        
        {playing && (
        <div className="flex justify-center items-center mt-4 rounded-full animate-spin duration-[3000] m-8 mx-auto">
          <Image 
            src={'/vinyl.png'}
            width={500}
            height={500}
            alt='Vinyl Record'
          />
        </div>
      )}
      {!playing && (
        <div className="flex justify-center items-center m-8 mt-4   rounded-full mx-auto">
          <Image 
            src={'/vinyl.png'}
            width={500}
            height={500}
            alt='Vinyl Record'
          />
        </div>
      )}

        <input
          type="text"
          placeholder="Paste YouTube or MP3 URL..."
          className="w-full p-2 mb-4 text-black font-lobster"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
    




        <div className="flex items-center gap-4 mt-4">
        <button onClick={handlePlayPause} className="text-2xl text-black font-lobster mx-auto"
        > {playing ? "⏸ Pause" : "▶ Play"}
    </button>

    

    </div>
    <div className="flex items-center gap-2 w-full mt-2">
            <span className="text-white text-sm">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
      </div>

      {duration > 0 && (
        <div className="flex justify-between w-full mt-4 font-lobster text-black">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      )}

    
    </div>
  )
}

export default Musicplayer