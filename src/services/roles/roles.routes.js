//import dependencies
const router = require('express').Router();

//middlewares
const { authN } = require('../../middlewares/authN');
const { isAdmin } = require('../../middlewares/authZ');

// controllers
const { readRoles, readRole, addRole, editRole, deleteRole } = require('./roles.controllers');

//Admin Routes -- Roles --> /dashboard
router.get('/roles', authN, isAdmin, readRoles);
router.get('/role/:id', authN, isAdmin, readRole);
router.post('/role', authN, isAdmin, addRole);
router.put('/role/:id', authN, isAdmin, editRole);
router.delete('/roles/:id', authN, isAdmin, deleteRole);

module.exports = router;
