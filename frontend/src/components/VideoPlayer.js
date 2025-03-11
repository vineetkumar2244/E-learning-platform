import React, { useEffect } from "react";

const VideoPlayer = ({ video }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      caches.open("video-cache").then(async (cache) => {
        const response = await fetch(`http://localhost:5000/video/${video}`);
        cache.put(`http://localhost:5000/video/${video}`, response);
      });
    }
  }, [video]);

  return (
    <div>
      <h2>Now Playing: {video}</h2>
      <video controls width="600">
        <source src={`http://localhost:5000/video/${video}`} type="video/mp4" />
      </video>
      <p>Video will be available offline after first play.</p>
    </div>
  );
};

export default VideoPlayer;
