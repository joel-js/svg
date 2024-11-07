/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Check if the browser natively supports H.265/HEVC (e.g., Safari on macOS or iOS)
      if (video.canPlayType('application/vnd.apple.mpegurl') && video.canPlayType('video/mp4; codecs="hev1.1.6.L93.B0"')) {
        video.src = src;
        video.autoplay = true;
        video.controls = true;
      } else if (Hls.isSupported()) {
        // Use HLS.js for browsers that do not natively support H.265/HEVC
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          // Additional configuration can go here
        });
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });

        return () => {
          hls.destroy();
        };
      } else {
        console.error('Your browser does not support HLS streaming or HEVC playback.');
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      style={{
        width: '100%',
        height: 'auto',
      }}
      playsInline
    />
  );
};

export default HLSPlayer;
