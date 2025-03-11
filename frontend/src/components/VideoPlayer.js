import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!video) return; // If no video is selected, do nothing

    // Force video reload when a new video is selected
    if (videoRef.current) {
      videoRef.current.load();
    }

    // Cache the video for offline access
    if ("serviceWorker" in navigator) {
      caches.open("video-cache").then(async (cache) => {
        const response = await fetch(`http://localhost:5000/video/${video}`);
        cache.put(`http://localhost:5000/video/${video}`, response);
      });
    }
  }, [video]);

  if (!video) return <h2>Select a video to play</h2>;

  return (
    <div>
      <h2>Now Playing: {video}</h2>
      <video ref={videoRef} controls width="600">
        <source src={`http://localhost:5000/video/${video}`} type="video/mp4" />
      </video>
      <p>Video will be available offline after first play.</p>
    </div>
  );
};

export default VideoPlayer;
