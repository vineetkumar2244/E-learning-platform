import React from "react";

const VideoList = ({ videos, setVideos, setSelectedVideo }) => {
  const handleDelete = async (video) => {
    await fetch(`http://localhost:5000/video/${video}`, { method: "DELETE" });
    alert("Video deleted successfully");

    // Remove deleted video from list
    const updatedVideos = videos.filter((v) => v !== video);
    setVideos(updatedVideos);

    // If the deleted video was playing, reset the player
    setSelectedVideo((prev) => (prev === video ? null : prev));

    // ✅ Notify service worker to remove video from cache
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: "DELETE_VIDEO",
        videoUrl: `http://localhost:5000/video/${video}`,
      });
    }
  };

  return (
    <div>
      <h2>Available Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video}>
            <button onClick={() => setSelectedVideo(video)}>{video}</button>
            <button onClick={() => window.open(`http://localhost:5000/video/${video}`)}>Download</button>
            <button onClick={() => handleDelete(video)} style={{ color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
