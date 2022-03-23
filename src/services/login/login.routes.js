const { logUser, regUser } = require('./login.controller');

const router = require('express').Router();

router.post('/signup', regUser);
router.post('/login', logUser);

module.exports = router;
