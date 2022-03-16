const { getHotels } = require('../controllers/hotel');
const { autht } = require('../middlewares/autht');
const { getPermissions } = require('../middlewares/authz');

module.exports =(app)=>{
    
    app.get('/hotels', getHotels)
    app.get('/hotelresults', getHotel);
    app.get('/hotel/guestDetails');
    
    app.get('/hotels/get', autht, getPermissions);
    app.post('/hotels/add', autht, getPermissions);
    app.delete('/hotels/delete', autht, getPermissions);
    app.put('/hotels/edit', autht, getPermissions);

}