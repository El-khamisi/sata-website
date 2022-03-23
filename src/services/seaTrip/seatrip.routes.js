//import dependencies
const router = require('express').Router();

const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { GDSSeaTrip } = require('../../config/resources');
const { readGDSSeatrip, createGDSSeatrip, updateGDSSeatrip, deleteGDSSeatrip } = require('./GDSseatrip.controller');

router.get('/gds', authN, canRead(GDSSeaTrip), readGDSSeatrip);
router.post('/gds', authN, canCreate(GDSSeaTrip), createGDSSeatrip);
router.put('/gds/:id', authN, canUpdate(GDSSeaTrip), updateGDSSeatrip);
router.delete('/gds/:id', authN, canDelete(GDSSeaTrip), deleteGDSSeatrip);

module.exports = router;
