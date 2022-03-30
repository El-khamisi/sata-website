//import dependencies
const router = require('express').Router();
const { multer } = require('../../config/multer');

//middlewares
const { authN } = require('../../middlewares/authN');
const { isAdmin } = require('../../middlewares/authZ');

// controllers
const { readUsers, readUser, addUser, editUser, deleteUser } = require('../user/admin.controllers');
const { readAgencys, readAgency, addAgency, editAgency, deleteAgency } = require('../agency/admin.controller');

//Admin Routes -- Users  --> /dashboard/admin
// router.get('/users', authN, isAdmin, readUsers);
// router.get('/user/:id', authN, isAdmin, readUser);
// router.post('/user', authN, isAdmin, multer.single('image'), addUser);
// router.put('/user/:id', authN, isAdmin, editUser);
// router.delete('/user/:id', authN, isAdmin, multer.single('image'), deleteUser);

router.get('/users', readUsers);
router.get('/user/:id', readUser);
router.post('/user', multer.single('image'), addUser);
router.put('/user/:id', multer.single('image'), editUser);
router.delete('/user/:id', deleteUser);

//Admin Routes -- Agencies  --> /dashboard/admin
// router.get('/agencys', authN, isAdmin, readAgencys);
// router.get('/agency/:id', authN, isAdmin, readAgency);
// router.post('/agency', authN, isAdmin, multer.array('images'), addAgency);
// router.put('/agency/:id', authN, isAdmin, multer.array('images'), editAgency);
// router.delete('/agency/:id', authN, isAdmin, deleteAgency);

router.get('/agencys', readAgencys);
router.get('/agency/:id', readAgency);
router.post('/agency', multer.array('images'), addAgency);
router.put('/agency/:id', multer.array('images'), editAgency);
router.delete('/agency/:id', deleteAgency);

module.exports = router;
