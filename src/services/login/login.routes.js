const router = require('express').Router();

const { logUser, regUser, regAgency, logAgency } = require('./login.controller');

const seeder = require('../../config/defaultConfig');

router.post('/signup/user', regUser);
router.post('/login/user', logUser);

router.post('/signup/agency', regAgency);
router.post('/login/agency', logAgency);

module.exports = router;
