import React from "react";

// This imports the functional component from the previous sample.
import VideoJS from "./VideoPlayer";
// import { urls } from "./videoURLs";
// import { videoTypes } from "./videoTypes";
const VideoHome = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    debug: true,
    // enableWorker: false,
    // lowLatencyMode: false,
    // backBufferLength: 5,
    // maxBufferLength: 6,
    // maxMaxBufferLength: 6,
    // frontBufferFlushThreshold: 6,
    // maxBufferSize: 0,
    // liveBackBufferLength: 5,
    sources: [
      {
        // src: "https://cr-64.hostedcloudvideo.com/rtp-cr/_definst_/a4bg62grg75o3nml7180sj1h7p/28013e163c1e034ecd4eaa003672161dfe428f97/playlist.m3u8",
        // src: "https://cr-64.hostedcloudvideo.com/rtp-cr/_definst_/a4bg62grg75o3nml7180sj1h7p/7b99a334306eb13adf8c764e49a14e9f01c3af73/playlist.m3u8",
        // src: "https://vod.hostedcloudvideo.com/7b99a334306eb13adf8c764e49a14e9f01c3af73/vod.m3u8?timestamp=1730960698&segment_type=FMp4",
        // src: "https://cr-64.hostedcloudvideo.com/rtp-cr/_definst_/a4bg62grg75o3nml7180sj1h7p/7b99a334306eb13adf8c764e49a14e9f01c3af73/media_w1328070133_vo_288494017.5_m3u8.cmfv",
        // src: "https://cr-64.hostedcloudvideo.com/rtp-cr/_definst_/a4bg62grg75o3nml7180sj1h7p/634b647856120c7ae8cbd1d309dcb209bb37cb3d/playlist.m3u8",
        // src: "https://vod.hostedcloudvideo.com/634b647856120c7ae8cbd1d309dcb209bb37cb3d/vod.m3u8?timestamp=1730965586&segment_type=FMp4",
        // src: "https://sitesecuritysystems.net:7001/media/761e568f-056b-3cd0-b86c-27375404ef5d.mpegts?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpoamxmOmMwNjI3MTc4MTYzNjg4ZWU1ZTRjNDc2ZDA1MjlmZTJh&pos=2024-11-06T21:31:09.000",
        // src: "https://sitesecuritysystems.net:7001/media/761e568f-056b-3cd0-b86c-27375404ef5d.mp4?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpoamxmOmMwNjI3MTc4MTYzNjg4ZWU1ZTRjNDc2ZDA1MjlmZTJh&pos=2024-11-06T21:31:09.000",
        // src: "https://bitmovin-a.akamaihd.net/webpages/demos/content/multi-codec/hevc/stream_fmp4.m3u8",
        // src: "https://sitesecuritysystems.net:7001/media/52432602-49dd-add2-e448-29a99339e455.mp4?authKey=d2c5aea3-c38f-44c3-83b8-e05a20ee4cea&auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpnZWl6OmJhMWU2ZDI5ZGE5MjE0NDg2NGUzMmU3NTJjZjMzY2M1",
        // src: "https://sitesecuritysystems.net:7001/media/52432602-49dd-add2-e448-29a99339e455.mp4?authKey=d2c5aea3-c38f-44c3-83b8-e05a20ee4cea&auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpnZWl6OmJhMWU2ZDI5ZGE5MjE0NDg2NGUzMmU3NTJjZjMzY2M1&pos=2024-11-07T09:00:00.000&rt=true&stream=1&resolution=320x240",
        // src: "https://sitesecuritysystems.net:7001/rest/v4/devices/52432602-49dd-add2-e448-29a99339e455/media.mp4?authKey=d2c5aea3-c38f-44c3-83b8-e05a20ee4cea&auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpnZWl6OmJhMWU2ZDI5ZGE5MjE0NDg2NGUzMmU3NTJjZjMzY2M1",
        // src: "https://sitesecuritysystems.net:7001/web/media/47d0d84e-c4e2-d7f1-ac0e-65ccfbbc41e4.webm?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpscHZwOjEzNjNmZjdkNzQwYzU2MjRjZGE3YzhlMWMyZjFhNTZi&resolution=2610p&",

        // orange beach

        // src: "https://sitesecuritysystems.net:7001/media/b7f46e7a-7bcd-d3bb-12be-a3d08271874e.mp4?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHp4enplOmIyNjMxYjNkMDBmNTVkNzQwNGU4NGY3YjZjN2VmYzQ4&resolution=1080p",


        // fairhaven

        src: "https://sitesecuritysystems.net:7001/media/2f5e2f8e-7e42-dadf-8dc1-3a2f0043d0c5.mp4?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpmZ3dpOmMyY2YzYzg2MzQ3NjEyM2ZiZTkyZTAzYmE0ODU3OWVi&resolution=1080p",

        // type: `application/vnd.apple.mpegurl`,
        // type: "application/x-mpegURL",
        // type: 'video/mp4'
        type: "video/webm"
        
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
};

export default VideoHome;

// // VideoHome.js
// import React from 'react';
// import VideoJS from './VideoPlayer';

// const VideoHome = () => {
//   const playerRef = React.useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     width: 720,
//     height: 405,
//     sources: [{
//       src: "https://sitesecuritysystems.net:7001/hls/24b7a123-3ff4-48a2-bc80-0590945e0b64.m3u8?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpyb2dvOmY2ZjY1OTBhNjQ3MGMwOTNlNzA3NTMxOWUyZDRkMmUy",
//       type: 'application/x-mpegURL',
//       withCredentials: false // Remove credentials requirement
//     }],
//     html5: {
//       vhs: {
//         overrideNative: true,
//         cacheEncryptionKeys: true
//       },
//       nativeAudioTracks: false,
//       nativeVideoTracks: false
//     }
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;

//     // Test the manifest without credentials
//     fetch(videoJsOptions.sources[0].src, {
//       method: 'GET',
//       credentials: 'omit' // Don't send credentials
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.text();
//       })
//       .then(data => {
//         console.log('Manifest fetch successful:', data.substring(0, 100));
//       })
//       .catch(error => {
//         console.error('Manifest fetch failed:', error);
//       });

//     player.on('error', () => {
//       const e = player.error();
//       console.error('Player Error:', {
//         code: e.code,
//         message: e.message,
//         type: e.type
//       });
//     });
//   };

//   return (
//     <div className="video-container">
//       <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
//     </div>
//   );
// };

// export default VideoHome;

// // VideoHome.js
// import React from 'react';
// import VideoJS from './VideoPlayer';

// const VideoHome = () => {
//   const playerRef = React.useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     width: 720,
//     height: 405,
//     sources: [{
//       src: "https://sitesecuritysystems.net:7001/hls/24b7a123-3ff4-48a2-bc80-0590945e0b64.m3u8?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpyb2dvOmY2ZjY1OTBhNjQ3MGMwOTNlNzA3NTMxOWUyZDRkMmUy",
//       type: 'application/x-mpegURL'
//     }],
//     html5: {
//       vhs: {
//         overrideNative: true,
//         cacheEncryptionKeys: true
//       },
//       nativeAudioTracks: false,
//       nativeVideoTracks: false
//     }
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;

//     // Test the manifest URL for any CORS or access issues
//     fetch(videoJsOptions.sources[0].src)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.text();
//       })
//       .then(data => {
//         console.log('Manifest fetch successful:', data.substring(0, 100));
//       })
//       .catch(error => {
//         console.error('Manifest fetch failed:', error);
//       });

//     player.on('error', () => {
//       const e = player.error();
//       console.error('Player Error:', {
//         code: e.code,
//         message: e.message,
//         type: e.type
//       });
//     });
//   };

//   return (
//     <div className="video-container">
//       <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
//     </div>
//   );
// };
