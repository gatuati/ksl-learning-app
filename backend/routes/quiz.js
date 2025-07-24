const r = require('express').Router();
const auth = require('../middleware/auth');
const { getQuizzes, submit } = require('../controllers/quiz');
r.get('/', auth, getQuizzes);
r.post('/', auth, submit);
module.exports = r;
