//import dependencies
const router = require('express').Router();

const { addAdmin, addAgency, addVice, getAgencies, getVices, addAgencyManger } = require('../controllers/adminLogin');
const { authN } = require('../middlewares/authN');
const { isAdmin } = require('../middlewares/authZ');
const User = require('../models/user');


//Admin Routes
// app.get('/dashboard', authN)
router.post('/add-admin', authN, isAdmin, addAdmin);
router.post('/add-vice', authN, isAdmin, addVice);
router.post('/add-agency', authN, isAdmin, addAgency);
router.post('/add-agencyManger', authN, isAdmin, addAgencyManger);
router.get('/get-agencies', getAgencies);
router.get('/get-vices', getVices);

module.exports = router;