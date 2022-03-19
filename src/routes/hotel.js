const { canCreate, canRead, canDelete, canUpdate } = require('../middlewares/authZ');
const { authN } = require('../middlewares/authN');
const { hotel } = require('../config/resources');
const { readHotel, createHotel, updateHotel, deleteHotel } = require('../controllers/hotel');

module.exports = (app) => {
  app.get('/hotels/get', authN, canRead(hotel), readHotel);
  app.post('/hotels/add', authN, canCreate(hotel), createHotel);
  app.put('/hotels/edit', authN, canUpdate(hotel), updateHotel);
  app.delete('/hotels/delete', authN, canDelete(hotel), deleteHotel);
};
