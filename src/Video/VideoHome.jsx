
import { urls } from './videoURLs';
import HLSPlayer from './HLSPlayer';
const VideoHome = () => {
  return (
    <>
      <div>Rest of app here</div>
      {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
      <HLSPlayer src={"https://ddstorage.org/samples/hevc/bitmovin/v720p_ts.m3u8"} />
      <div>Rest of app here</div>
    </>
  );
}

export default VideoHome;
