import React from 'react';
import Hls from 'hls.js';

import { urls } from '../Video/videoURLs';

const VideoPlayer = () => {
  const videoRef = React.useRef(null);
  const src = urls.storybook.hiTrue;
  React.useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari native HLS support
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }
  }, []);

  return (
    <video ref={videoRef} controls style={{ width: '100%' }} />
  );
};

export default VideoPlayer;
