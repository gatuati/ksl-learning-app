const Quiz = require("../models/Quiz")

exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({ ...req.body, userId: req.user._id })
    res.status(201).json(quiz)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getUserQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({ userId: req.user._id })
  res.json(quizzes)
}
