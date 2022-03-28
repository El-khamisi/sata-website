//import dependencies
const router = require('express').Router();

//middlewares
const { authN } = require('../../middlewares/authN');
const { isAdmin } = require('../../middlewares/authZ');

// controllers
const { readRoles, readRole, addRole, editRole, deleteRole } = require('./roles.controllers');

//Admin Routes -- Roles --> /dashboard
// router.get('/roles', authN, isAdmin, readRoles);
router.get('/roles', readRoles);
// router.get('/role/:id', authN, isAdmin, readRole);
router.get('/role/:id', readRole);
// router.post('/role', authN, isAdmin, addRole);
router.post('/role', addRole);
// router.put('/role/:id', authN, isAdmin, editRole);
router.put('/role/:id', editRole);
// router.delete('/role/:id', authN, isAdmin, deleteRole);
router.delete('/role/:id', deleteRole);

module.exports = router;
