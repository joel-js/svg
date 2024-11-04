import VideoJS from './VideoPlayer';
import { urls } from './videoURLs';

const VideoHome = () => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: urls.storybook.adaptive,
        type: 'application/x-mpegURL',
      },
    ],
  };

  const handlePlayerReady = (player) => {
    player.on('waiting', () => {
      console.log('player is waiting');
    });
    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
}

export default VideoHome;


// import React from 'react';

// // This imports the functional component from the previous sample.
// import VideoJS from './VideoPlayer'
// import { urls } from './videoURLs';

// const VideoHome = () => {
//   const playerRef = React.useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     sources: [{
//       src: urls.storybook.adaptive ,
//       type: 'application/x-mpegURL, codecs="hevc,mp4a.40.2"'
//     }],
//     /*
//     html5: {
//       vhs: {
//         overrideNative: true
//       },
//       nativeAudioTracks: false,
//       nativeVideoTracks: false
//     }
//       */
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;

//     // You can handle player events here, for example:
//     player.on('waiting', () => {
//       console.log('player is waiting');
//     });

//     player.on('dispose', () => {
//       console.log('player will dispose');
//     });
//   };
  
//   return (
//     <>
//       <div>Rest of app here</div>
//       <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
//       <div>Rest of app here</div>
//     </>
//   );
// }

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

