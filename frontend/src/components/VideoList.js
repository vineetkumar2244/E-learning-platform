import React from "react";

const VideoList = ({ videos, setVideos, setSelectedVideo }) => {
  const handleDelete = async (video) => {
    await fetch(`http://localhost:5000/video/${video}`, { method: "DELETE" });
    alert("Video deleted successfully");
    setVideos(videos.filter((v) => v !== video));
    setSelectedVideo(null);
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
