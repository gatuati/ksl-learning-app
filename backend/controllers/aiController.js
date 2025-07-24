const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAIResponse = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a KSL assistant. Translate the phrase and suggest a video if possible.',
        },
        { role: 'user', content: prompt },
      ],
    });

    const response = chatCompletion.choices[0].message.content;
    res.json({ response });
  } catch (error) {
    console.error("❌ AI Error:", error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

module.exports = { getAIResponse };
