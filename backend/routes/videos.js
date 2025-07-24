const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

router.get('/', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

module.exports = router;
