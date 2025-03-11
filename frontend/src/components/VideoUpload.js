import React, { useState } from "react";

const VideoUpload = ({ setVideos }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", file);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    alert("Upload Successful");
    setVideos((prev) => [...prev, file.name]);
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default VideoUpload;
