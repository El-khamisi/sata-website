//import dependencies
const router = require('express').Router();

const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { GDSTourPackage } = require('../../config/resources');
const { readGDSTourpackage, createGDSTourpackage, updateGDSTourpackage, deleteGDSTourpackage } = require('./GDStourpackage.controller');

router.get('/gds', authN, canRead(GDSTourPackage), readGDSTourpackage);
router.post('/gds', authN, canCreate(GDSTourPackage), createGDSTourpackage);
router.put('/gds/:id', authN, canUpdate(GDSTourPackage), updateGDSTourpackage);
router.delete('/gds/:id', authN, canDelete(GDSTourPackage), deleteGDSTourpackage);

module.exports = router;
