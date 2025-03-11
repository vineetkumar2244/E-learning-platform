const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("video"), (req, res) => {
  res.json({ message: "Upload successful", filename: req.file.filename });
});

// Get all videos
app.get("/videos", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json({ error: err });
    res.json(files);
  });
});

// Stream video
app.get("/video/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.sendFile(filePath);
});

//Delete video
app.delete("/video/:filename", (req, res) => {
    const filePath = path.join(__dirname, "uploads", req.params.filename);
    fs.unlink(filePath, (err) => {
      if (err) return res.status(500).json({ error: "File deletion failed" });
      res.json({ message: "Video deleted successfully" });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
