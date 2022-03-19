const { readFlight, deleteFlight, updateFlight, createFlight } = require('../controllers/flight');
const { authN } = require('../middlewares/authN');
const { canCreate, canRead, canDelete, canUpdate } = require('../middlewares/authz');
const { flight } = require('../config/resources');

module.exports = (app) => {
  app.get('/flights/get', authN, canRead(flight), readFlight);
  app.post('/flights/add', authN, canCreate(flight), createFlight);
  app.put('/flights/edit', auth, canUpdate(flight), updateFlight);
  app.delete('/flights/delete', authN, canDelete(flight), deleteFlight);
};
