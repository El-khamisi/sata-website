//import dependencies
const router = require('express').Router();

//middlewares
const { authN } = require('../../middlewares/authN');
const { isAdmin } = require('../../middlewares/authZ');

// controllers
const { readGeos, readGeo, addGeo, editGeo, deleteGeo } = require('./geolocation.controllers');


//Admin Routes -- Geos --> /dashboard
router.get('/geos', authN, isAdmin, readGeos);
router.get('/geo/:id', authN, isAdmin, readGeo);
router.post('/geo', authN, isAdmin, addGeo);
router.put('/geo/:id', authN, isAdmin, editGeo);
router.delete('/geo/:id', authN, isAdmin, deleteGeo);

module.exports = router;
