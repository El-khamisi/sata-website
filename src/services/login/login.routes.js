const { logUser, regUser } = require('./login.controller');

const router = require('express').Router();
const seeder = require('../../config/defaultConfig');
const { authN } = require('../../middlewares/authN');
const { canRead } = require('../../middlewares/authZ');

router.post('/signup', regUser);
router.post('/login', logUser);


module.exports = router;
