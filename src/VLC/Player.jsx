/* eslint-disable react/prop-types */
import React from 'react';
import '../lib/vlc/experimental';
import { VLCPlayer } from '../lib/vlc/vlc';


const VLCPlayerComponent = ({ videoSource, options = "", width = "700px", height = "" }) => {
    const canvasRef = React.useRef(null);
    const [player, setPlayer] = React.useState(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(80);
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      const initVLC = async () => {
        try {
          // Since we've imported VLCPlayer at the top, we can use it directly
          const videoConfig = {
            source: videoSource,
            options: options || "--codec=webcodec --aout=emworklet_audio -vv --input-repeat=10000",
            size: {
              width,
              height
            }
          };
  
          const vlcInstance = await VLCPlayer(videoConfig);
          setPlayer(vlcInstance);
        } catch (error) {
          console.error('Error initializing VLC:', error);
        }
      };
  
      initVLC();
  
      return () => {
        if (player) {
          player.cleanup?.();
        }
      };
    }, [videoSource, options, width, height]);
  
    const handlePlay = () => {
      if (player) {
        player.play?.();
        setIsPlaying(true);
      }
    };
  
    const handlePause = () => {
      if (player) {
        player.pause?.();
        setIsPlaying(false);
      }
    };
  
    const handleVolumeChange = (e) => {
      const newVolume = parseInt(e.target.value);
      setVolume(newVolume);
      if (player) {
        player.setVolume?.(newVolume);
      }
    };
  
    const handleSeek = (e) => {
      const newProgress = parseInt(e.target.value);
      setProgress(newProgress);
      if (player) {
        player.seek?.(newProgress);
      }
    };
  
    return (
      <div className="flex flex-col gap-4">
        <canvas 
          ref={canvasRef}
          className="bg-gray-500"
          id="canvas"
        />
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isPlaying}
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={!isPlaying}
          >
            Stop
          </button>
          <meter
            value={progress}
            max="100"
            className="w-96"
            onChange={handleSeek}
          />
          <meter
            value={volume}
            max="100"
            className="w-24"
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    );
  };
  
  export default VLCPlayerComponent;