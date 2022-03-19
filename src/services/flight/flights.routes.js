//import dependencies
const router = require('express').Router();

const { readFlight, deleteFlight, updateFlight, createFlight } = require('./flight.controller');
const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { flight } = require('../../config/resources');


router.get('/get', authN, canRead(flight), readFlight);
router.post('/add', authN, canCreate(flight), createFlight);
router.put('/edit', authN, canUpdate(flight), updateFlight);
router.delete('/delete', authN, canDelete(flight), deleteFlight);

module.exports = router;