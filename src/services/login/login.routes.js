const router = require('express').Router();
const path = require('path');
const { uploadImage } = require('../user/user.controllers');

const { logUser, regUser, regAgency, logAgency } = require('./login.controller');
const upload = require('../../config/multer');

const seeder = require('../../config/defaultConfig');

router.post('/signup/user', regUser);
router.post('/login/user', logUser);

// router.post('/signup/agency', regAgency);    **deprecated
router.post('/login/agency', logAgency);

module.exports = router;
