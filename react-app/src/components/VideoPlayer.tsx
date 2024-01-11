"use client"

import dynamic from 'next/dynamic'
import React, { Component } from 'react';
// import ReactPlayer from 'react-player'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  width: string;
  height: string;
  videoUrl: string;
}

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = (props) => {
  return (
    <div className="player-wrapper card">
      <ReactPlayer
        width={props.width}
        height={props.width}
        url={props.videoUrl}
        controls={false}
        muted={true}
        playing={true}
        loop={true}
        className={""}
      />
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