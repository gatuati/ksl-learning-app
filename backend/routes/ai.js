import express from 'express'
const router = express.Router()
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set
})

const openai = new OpenAIApi(configuration)

router.post('/', async (req, res) => {
  try {
    const { message } = req.body
    if (!message) return res.status(400).json({ error: 'Message is required' })

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    })

    res.json({ reply: response.data.choices[0].message.content })
  } catch (error) {
    console.error('AI Error:', error.message)
    res.status(500).json({ error: 'Failed to get AI response' })
  }
})

export default router
