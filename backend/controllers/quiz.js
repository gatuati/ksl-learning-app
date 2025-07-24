const Content = require('../models/content');
const Quiz = require('../models/Quiz');

exports.getQuizzes = async (req,res) => {
  const quizzes = await Quiz.find({ userId: req.user._id });
  res.json(quizzes);
};

exports.submit = async (req,res) => {
  const { answers } = req.body;
  const quizEntries = await Content.find({ type: 'quiz' });
  let score = 0;
  quizEntries.forEach((q,i) => {
    if (answers[i] === q.correctAnswer) score++;
  });
  const quiz = await Quiz.create({ userId: req.user._id, answers, score });
  res.json(quiz);
};
