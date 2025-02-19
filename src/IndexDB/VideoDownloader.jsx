

const VideoDownloader = () => {
  const handleDownload = async () => {
    const url = 'https://hls-proxy.sitesecuritysystems.net/hls/2f5e2f8e-7e42-dadf-8dc1-3a2f0043d0c5.mkv?duration=120&hi=true&pos=2025-02-04T00:00:00.0'; // Replace with your video URL
    const token = 'vms-a20262d940fd00b1b03ac1e9726add26-VMUbwmX3jC'; // Replace with your authentication token

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = 'video.mp4'; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Video</button>
    </div>
  );
};

export default VideoDownloader;
