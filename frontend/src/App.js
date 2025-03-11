import React, { useState, useEffect } from "react";
import VideoUpload from "./components/VideoUpload";
import VideoList from "./components/VideoList";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  return (
    <div>
      <h1>Video Upload & Playback</h1>
      <VideoUpload setVideos={setVideos} />
      <VideoList videos={videos} setVideos={setVideos} setSelectedVideo={setSelectedVideo} />
      {selectedVideo && <VideoPlayer video={selectedVideo} />}
    </div>
  );
};

export default App;
