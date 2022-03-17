const { readFlight, deleteFlight, updateFlight, createFlight } = require('../controllers/flight');
const {autht} = require('../middlewares/autht');
const { canCreate, canRead, canDelete, canUpdate} = require('../middlewares/authz');
const {flight} = require('../config/resources');

module.exports =(app)=>{

  
    app.get('/flights/get', autht, canRead(flight), readFlight);
    app.post('/flights/add', autht, canCreate(flight), createFlight);
    app.put('/flights/edit', auth, canUpdate(flight), updateFlight);
    app.delete('/flights/delete', autht, canDelete(flight), deleteFlight);
}