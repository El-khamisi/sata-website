const { canCreate, canRead, canDelete, canUpdate } = require('../middlewares/authz');
const { autht } = require('../middlewares/autht');
const { hotel } = require('../config/resources');
const { readHotel, createHotel, updateHotel, deleteHotel } = require('../controllers/hotel');

module.exports = (app) => {
  app.get('/hotels/get', autht, canRead(hotel), readHotel);
  app.post('/hotels/add', autht, canCreate(hotel), createHotel);
  app.put('/hotels/edit', autht, canUpdate(hotel), updateHotel);
  app.delete('/hotels/delete', autht, canDelete(hotel), deleteHotel);
};
