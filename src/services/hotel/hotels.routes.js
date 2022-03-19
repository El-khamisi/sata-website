//import dependencies
const router = require('express').Router();

const { canCreate, canRead, canDelete, canUpdate } = require('../../middlewares/authZ');
const { authN } = require('../../middlewares/authN');
const { hotel } = require('../../config/resources');
const { readHotel, createHotel, updateHotel, deleteHotel } = require('./hotel.controller');


router.get('/get', authN, canRead(hotel), readHotel);
router.post('/add', authN, canCreate(hotel), createHotel);
router.put('/edit', authN, canUpdate(hotel), updateHotel);
router.delete('/delete', authN, canDelete(hotel), deleteHotel);

  
module.exports = router;