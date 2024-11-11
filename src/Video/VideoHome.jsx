
import { urls } from './videoURLs';
import HLSPlayer from './HLSPlayer';
const VideoHome = () => {
  return (
    <>
      <div>Rest of app here</div>
      {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
      <HLSPlayer src={urls.storybook.hiTrue} />
      <div>Rest of app here</div>
    </>
  );
}

export default VideoHome;
