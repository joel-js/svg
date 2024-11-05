/* eslint-disable react/prop-types */
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";



export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);


      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          html5: {
            vhs: {
              overrideNative: !videojs.browser.IS_SAFARI,
              fastQualityChange: true,
              useDevicePixelRatio: true,
              handleManifestRedirects: true,
              experimentalBufferBasedABR: true,
            },
            nativeAudioTracks: false,
            nativeVideoTracks: false,
          },
        },
        () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ));

      // Enhanced error handling
      player.on('error', () => {
        const error = player.error();
        console.error('Video Player Error:', {
          error: error,
          code: error.code,
          message: error.message,
          type: error.type,
        });

        // Handle HEVC-specific errors
        
      });

    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;

// // /* eslint-disable react/prop-types */
// // // VideoPlayer.js
// // import React from 'react';

// // const VideoJS = (props) => {
// //   const videoRef = React.useRef(null);
// //   const playerRef = React.useRef(null);
// //   const { options, onReady } = props;

// //   React.useEffect(() => {
// //     if (!playerRef.current) {
// //       const initPlayer = async () => {
// //         const videojs = (await import('video.js')).default;

// //         const player = videojs(videoRef.current, {
// //           ...options,
// //           html5: {
// //             hls: {
// //               overrideNative: true,
// //               enableLowInitialPlaylist: false,
// //               maxMaxBufferLength: 30,
// //               handleManifestRedirects: true,
// //               withCredentials: false, // Remove credentials requirement
// //               debug: true
// //             }
// //           },
// //           // liveui: true,
// //           techOrder: ['html5']
// //         }, () => {
// //           console.log('Player initialized with options:', options);
// //           onReady && onReady(player);
// //         });

// //         // Error handling
// //         player.on('error', () => {
// //           const e = player.error();
// //           console.error('Video Player Error:', {
// //             code: e.code,
// //             message: e.message,
// //             type: e.type,
// //             details: JSON.stringify(e)
// //           });
// //         });

// //         player.on('loadstart', () => {
// //           console.log('Starting to load playlist');
// //           console.log('Current source:', player.currentSource());
// //         });

// //         playerRef.current = player;
// //       };

// //       initPlayer();
// //     }
// //   }, [options, videoRef]);

// //   // Cleanup
// //   React.useEffect(() => {
// //     const player = playerRef.current;
// //     return () => {
// //       if (player && !player.isDisposed()) {
// //         player.dispose();
// //         playerRef.current = null;
// //       }
// //     };
// //   }, [playerRef]);

// //   return (
// //     <div data-vjs-player>
// //       <video
// //         ref={videoRef}
// //         className="video-js vjs-big-play-centered"
// //       />
// //     </div>
// //   );
// // };

// // export default VideoJS;

// // VideoPlayer.js
// import React from 'react';

// const VideoJS = (props) => {
//   const videoRef = React.useRef(null);
//   const playerRef = React.useRef(null);
//   const { options, onReady } = props;

//   React.useEffect(() => {
//     if (!playerRef.current) {
//       const initPlayer = async () => {
//         const videojs = (await import('video.js')).default;

//         const player = videojs(videoRef.current, {
//           ...options,
//           techOrder: ['html5'], // Set techOrder to prioritize html5
//           debug: true
//         }, () => {
//           console.log('Player initialized with options:', options);
//           onReady && onReady(player);
//         });

//         // Add event listeners for debugging
//         player.on('error', () => {
//           const e = player.error();
//           console.error('Video Player Error:', {
//             code: e.code,
//             message: e.message,
//             type: e.type
//           });
//         });

//         player.on('loadstart', () => {
//           console.log('Starting to load playlist');
//           console.log('Current source:', player.currentSource());
//         });

//         player.on('loadedmetadata', () => {
//           console.log('Metadata loaded, ready to play');
//         });

//         playerRef.current = player;
//       };

//       initPlayer();
//     }
//   }, [options, videoRef]);

//   // Cleanup
//   React.useEffect(() => {
//     const player = playerRef.current;
//     return () => {
//       if (player && !player.isDisposed()) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [playerRef]);

//   return (
//     <div data-vjs-player>
//       <video
//         ref={videoRef}
//         className="video-js vjs-big-play-centered"
//       />
//     </div>
//   );
// };

// export default VideoJS;
