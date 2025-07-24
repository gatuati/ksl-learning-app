// routes/admin.js
const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const Content = require("../models/content");
const User = require("../models/User");
const isAdmin = require("../middleware/isAdmin");

// CREATE Video
router.post("/videos", isAdmin, async (req, res) => {
  const video = new Video(req.body);
  await video.save();
  res.json(video);
});

// READ Videos
router.get("/videos", isAdmin, async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// UPDATE Video
router.put("/videos/:id", isAdmin, async (req, res) => {
  const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE Video
router.delete("/videos/:id", isAdmin, async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Same for Content and Users
