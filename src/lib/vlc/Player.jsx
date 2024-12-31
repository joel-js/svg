/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/lib/VLC/Player.jsx
import React, { useEffect, useRef, useState } from 'react';

const VLCPlayerComponent = ({ videoSource, options = "", width = "700px", height = "" }) => {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let vlcModule;

    const initVLC = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Set up the global WebSocket if needed
        if (typeof window !== 'undefined' && !window.WebSocket) {
          window.WebSocket = class WebSocket extends globalThis.WebSocket {
            constructor(url, protocols) {
              super(url, protocols);
            }
          };
        }

        // Load experimental.js
        await import('../../lib/vlc/experimental.js');
        
        // Wait for the module to be ready
        await new Promise((resolve, reject) => {
          window.Module = {
            ...window.Module,
            onRuntimeInitialized: () => {
              console.log('Runtime initialized');
              resolve();
            },
            onAbort: (error) => {
              console.error('Module initialization aborted:', error);
              reject(new Error('Failed to initialize VLC module'));
            }
          };
        });

        // Import VLC player
        const { VLCPlayer } = await import('../../lib/vlc/vlc.js');
        
        const videoConfig = {
          source: videoSource,
          options: options || "--codec=webcodec --aout=emworklet_audio -vv --input-repeat=10000",
          size: {
            width,
            height
          },
          canvas: canvasRef.current
        };

        vlcModule = await VLCPlayer(videoConfig);
        setPlayer(vlcModule);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing VLC:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    initVLC();

    return () => {
      if (vlcModule) {
        vlcModule.cleanup?.();
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-[400px] bg-gray-500">
          Loading VLC Player...
        </div>
      ) : (
        <>
          <canvas 
            ref={canvasRef}
            className="bg-gray-500"
            id="canvas"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isPlaying || isLoading}
            >
              Play
            </button>
            <button
              onClick={handlePause}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              disabled={!isPlaying || isLoading}
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
        </>
      )}
    </div>
  );
};

export default VLCPlayerComponent;