const r = require('express').Router();
const auth = require('../middleware/auth');
const role = require('../middleware/roleMiddleware');
const { getAll, create } = require('../controllers/content');

r.get('/', auth, getAll);
r.post('/', auth, role, create);
module.exports = r;
