const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const { OpenAI } = require('openai');
const authRoutes = require('./routes/auth');
// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/quizzes', require('./routes/quiz'));
app.use('/api/videos', require('./routes/videos'));


// AI Route
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/ai', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant that helps users translate phrases into Kenyan Sign Language. If available, suggest a video link. Be clear and concise.',
        },
        { role: 'user', content: prompt },
      ],
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }

    res.json({ response });
  } catch (error) {
    console.error('❌ OpenAI Error:', error);
    res.status(500).json({
      error: 'Failed to get AI response',
      details: error?.response?.data || error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

});
