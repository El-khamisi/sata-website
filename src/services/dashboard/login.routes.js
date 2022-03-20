const login = require('../login/login.controller');
const passport = require('passport');

const router = require('express').Router();



router.post('/login', login.logUser)
router.post('/signup', login.logUser);

module.exports = router;