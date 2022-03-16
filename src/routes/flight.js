const {autht} = require('../middlewares/autht');
const {getPermissions} = require('../middlewares/authz');


module.exports =(app)=>{

    app.get('/flights', );
    app.get('flightresults');
    app.get('/flight/guestDetails');

    app.get('/flights/get', autht, getPermissions);
    app.post('/flights/add', autht, getPermissions);
    app.delete('/flights/delete', autht, getPermissions);
    app.put('/flights/edit', auth, getPermissions);
}