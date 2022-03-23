//import dependencies
const router = require('express').Router();

const { readFlight, deleteFlight, updateFlight, createFlight } = require('./flight.controller');
const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { flight, GDSFlight } = require('../../config/resources');
const { readGDSFlight, createGDSFlight, updateGDSFlight, deleteGDSFlight } = require('./GDSflight.controller');

// router.get('/', authN, canRead(flight), readFlight);
// router.post('/', authN, canCreate(flight), createFlight);
// router.put('/', authN, canUpdate(flight), updateFlight);
// router.delete('/', authN, canDelete(flight), deleteFlight);

router.get('/gds', authN, canRead(GDSFlight), readGDSFlight);
router.post('/gds', authN, canCreate(GDSFlight), createGDSFlight);
router.put('/gds/:id', authN, canUpdate(GDSFlight), updateGDSFlight);
router.delete('/gds/:id', authN, canDelete(GDSFlight), deleteGDSFlight);

module.exports = router;
