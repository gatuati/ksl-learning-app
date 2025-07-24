const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  youtubeId: { type: String, required: true },
  tags: [String],
});

module.exports = mongoose.model("Video", videoSchema);
