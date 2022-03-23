//import dependencies
const router = require('express').Router();

const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { GDSCar } = require('../../config/resources');
const { readGDSCar, createGDSCar, updateGDSCar, deleteGDSCar } = require('./GDScar.controller');

router.get('/gds', authN, canRead(GDSCar), readGDSCar);
router.post('/gds', authN, canCreate(GDSCar), createGDSCar);
router.put('/gds/:id', authN, canUpdate(GDSCar), updateGDSCar);
router.delete('/gds/:id', authN, canDelete(GDSCar), deleteGDSCar);

module.exports = router;
