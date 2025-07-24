require("dotenv").config();
const mongoose = require("mongoose");
const Video = require("../models/Video");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Video.deleteMany({});
  await Video.insertMany([
    {
      title: "Hello",
      description: "How to sign 'Hello' in KSL",
      youtubeId: "CrUk8oOPUKM", // turn0search0
      tags: ["alphabet", "greeting"]
    },
    {
      title: "Thank You",
      description: "How to say 'Thank You' in KSL",
      youtubeId: "hFkugOIdCiw", // turn0search3
      tags: ["word", "politeness"]
    },
    {
      title: "Greetings Compilation",
      description: "Common KSL greetings",
      youtubeId: "xk80ZpHZ4s8", // turn0search15
      tags: ["phrase", "greeting"]
    },
  ]);
  console.log("✅ Videos seeded");
  mongoose.disconnect();
});
