//import dependencies
const router = require('express').Router();

const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { hotel } = require('../../config/resources');
const {readGDSHotel, createGDSHotel, updateGDSHotel, deleteGDSHotel} = require('./GDShotel.controller')

router.get('/gds', authN, canRead(hotel), readGDSHotel);
router.post('/gds', authN, canCreate(hotel), createGDSHotel);
router.put('/gds/:id', authN, canUpdate(hotel), updateGDSHotel);
router.delete('/gds/:id', authN, canDelete(hotel), deleteGDSHotel);

module.exports = router;
