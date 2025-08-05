"use client"

import dynamic from 'next/dynamic'
import Image from 'next/image';
import React, { Component } from 'react';
import {useEffect, useState} from 'react';
// import ReactPlayer from 'react-player'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  width: string;
  height: string;
  videoUrl: string;
  gifUrl: string;
}

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = (props) => {
  const [isDesktop, setIsDesktop] = useState(true);


  return (
    <div className="player-wrapper card my-12">
      {/* <ReactPlayer
        width={props.width}
        height={props.width}
        url={props.videoUrl}
        controls={false}
        muted={true}
        playing={true}
        loop={true}
        playsinline={true}
        className={""}
      /> */}

      {isDesktop ?
          (<ReactPlayer
            width={props.width}
            height={props.width}
            url={props.videoUrl}
            controls={false}
            muted={true}
            playing={true}
            loop={true}
            playsinline={true}
            className={""}
          />)
            : 
          (<Image
            src={props.gifUrl}
            alt=""
            height={0}
            width={0}
            sizes="225vw"
            style={{ width: '100%', height: 'auto' }}
          />)
      } 

      <source src={props.videoUrl} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;

// export const VideoPlayer = ({ videoTitle, videoUrl }):
// VideoPlayerProps => {
//   const [hasWindow, setHasWindow] = useState(false);
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setHasWindow(true);
//     }
//   }, []);

//   return (
//     <div>

//     </div>
//   );
// }

// src: https://github.com/cookpete/react-player/issues/1428