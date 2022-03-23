//import dependencies
const router = require('express').Router();

//middlewares
const { authN } = require('../../middlewares/authN');
const { isAdmin } = require('../../middlewares/authZ');

// controllers
const { readUsers, readUser, addUser, editUser, deleteUser } = require('./admin.controllers');


//Admin Routes -- Users  --> /dashboard/admin
router.get('/users', authN, isAdmin, readUsers);
router.get('/user/:id', authN, isAdmin, readUser);
router.post('/user', authN, isAdmin, addUser);
router.put('/user/:id', authN, isAdmin, editUser);
router.delete('/user/:id', authN, isAdmin, deleteUser);

//Admin Routes -- Agencies
router.get('/agencies', authN, isAdmin, );
router.get('/agency/:id', authN, isAdmin, );
router.post('/agency', authN, isAdmin, );
router.put('/agency', authN, isAdmin, );
router.delete('/agency', authN, isAdmin, );

module.exports = router;
