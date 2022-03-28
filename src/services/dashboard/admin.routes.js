//import dependencies
const router = require('express').Router();

//middlewares
const { authN } = require('../../middlewares/authN');
const { isAdmin } = require('../../middlewares/authZ');

// controllers
const { readUsers, readUser, addUser, editUser, deleteUser } = require('../user/admin.controllers');
const { readAgencys, readAgency, addAgency, editAgency, deleteAgency } = require('../agency/admin.controller');

//Admin Routes -- Users  --> /dashboard
router.get('/users', authN, isAdmin, readUsers);
router.get('/user/:id', authN, isAdmin, readUser);
router.post('/user', authN, isAdmin, addUser);
router.put('/user/:id', authN, isAdmin, editUser);
router.delete('/user/:id', authN, isAdmin, deleteUser);

//Admin Routes -- Agencies  --> /dashboard
router.get('/agencys', authN, isAdmin, readAgencys);
router.get('/agency/:id', authN, isAdmin, readAgency);
router.post('/agency', authN, isAdmin, addAgency);
router.put('/agency/:id', authN, isAdmin, editAgency);
router.delete('/agency/:id', authN, isAdmin, deleteAgency);

module.exports = router;