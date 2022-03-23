//import dependencies
const router = require('express').Router();

const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { GDSInsurance } = require('../../config/resources');
const { readGDSInsurance, createGDSInsurance, updateGDSInsurance, deleteGDSInsurance } = require('./GDSinsurance.controller');

router.get('/gds', authN, canRead(GDSInsurance), readGDSInsurance);
router.post('/gds', authN, canCreate(GDSInsurance), createGDSInsurance);
router.put('/gds/:id', authN, canUpdate(GDSInsurance), updateGDSInsurance);
router.delete('/gds/:id', authN, canDelete(GDSInsurance), deleteGDSInsurance);

module.exports = router;
