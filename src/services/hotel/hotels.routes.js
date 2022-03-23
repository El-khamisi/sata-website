//import dependencies
const router = require('express').Router();

const { authN } = require('../../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { hotel } = require('../../config/resources');
const { readHotel, createHotel, updateHotel, deleteHotel } = require('./hotel.controller');

router.get('/gds', authN, canRead(hotel), readHotel);
router.post('/gds', authN, canCreate(hotel), createHotel);
router.put('/gds/:id', authN, canUpdate(hotel), updateHotel);
router.delete('/gds/:id', authN, canDelete(hotel), deleteHotel);

module.exports = router;
