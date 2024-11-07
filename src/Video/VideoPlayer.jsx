/* eslint-disable react/prop-types */
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";

import { videoTypes } from "./videoTypes";

function checkHEVCSupport() {
  const video = document.createElement('video');
  // Check for HEVC support
  const hevcSupport = video.canPlayType(`${videoTypes.app_xmpeg}; codecs="hvc1.1.6.L93.B0"`) || 
                      video.canPlayType(`${videoTypes.app_xmpeg}; codecs="hevc,aac"`);
  console.log("HEVC Support: ", hevcSupport);
  return hevcSupport !== "";
}

function checkCodecSupport() {
  const testFormats = [
    { codec: 'hevc,mp4a.40.2', name: 'HEVC/H.265' },
    { codec: 'avc1.42E01E', name: 'AVC/H.264' },
    { codec: 'hev1.1.6.L93.B0', name: 'HEVC Main 10' },
    { codec: 'hvc1.1.6.L93.B0', name: 'HEVC Main 10 (alternate)' }
  ];

  const video = document.createElement('video');
  const results = {};

  testFormats.forEach(format => {
    results[format.name] = video.canPlayType(`${videoTypes.mp4}; codecs="${format.codec}"`);
  });

  console.log("Codec Support:", results);
  return results;
}

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

      const codecSupport = checkCodecSupport();
      const hasHEVCSupport = checkHEVCSupport();

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          html5: {
            vhs: {
              audio: false,
              handlePartialAudioTracks: false,
              // overrideNative: true,
              fastQualityChange: true,
              useDevicePixelRatio: true,
              handleManifestRedirects: true,
              experimentalBufferBasedABR: true,
            },
            nativeAudioTracks: false,
            nativeVideoTracks: true,
          },
        },
        () => {
          videojs.log("player is ready");
          videojs.log('HEVC Support:', hasHEVCSupport);
          videojs.log('Codec Support:', codecSupport);
          onReady && onReady(player);
        }
      ));
      // player.on('loadedmetadata', () => {
      //   const qualityLevels = player.qualityLevels();
      //   if (qualityLevels) {
      //     // Log available quality levels and their codecs
      //     for (let i = 0; i < qualityLevels.length; i++) {
      //       const level = qualityLevels[i];
      //       console.log(`Quality level ${i}:`, {
      //         bandwidth: level.bitrate,
      //         width: level.width,
      //         height: level.height,
      //         codec: level.currentCodec
      //       });
      //     }

      //     // Enable/disable quality levels based on codec support
      //     qualityLevels.on('addqualitylevel', (event) => {
      //       const quality = event.qualityLevel;
      //       if (quality.currentCodec && quality.currentCodec.includes('hevc')) {
      //         quality.enabled = hasHEVCSupport;
      //       }
      //     });
      //   }
      // });

      // Enhanced error handling
      player.on('error', () => {
        const error = player.error();
        console.error('Video Player Error:', {
          error: error,
          code: error.code,
          message: error.message,
          type: error.type,
          codecSupport: codecSupport
        });

        // Handle HEVC-specific errors
        if (error.code === 4 && hasHEVCSupport === false) {
          console.error('HEVC playback failed - codec not supported');
          // You could implement fallback logic here
        }
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
