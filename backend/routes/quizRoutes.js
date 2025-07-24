const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const { submitQuiz, getUserQuizzes } = require("../controllers/quizController")

router.post("/", protect, submitQuiz)
router.get("/", protect, getUserQuizzes)

module.exports = router
