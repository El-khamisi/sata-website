const { addAdmin, addAgency, addVice, getAgencies, getVices, addAgencyManger } = require('../controllers/adminLogin');
const {autht} = require('../middlewares/autht');
const {isAdmin} = require('../middlewares/authz');
const User = require('../models/user');

module.exports = (app)=>{

    //Admin Routes
    // app.get('/dashboard', autht)
    app.post('/dashboard/add-admin',autht, isAdmin, addAdmin);
    app.post('/dashboard/add-vice', autht, isAdmin, addVice);
    app.post('/dashboard/add-agency', autht, isAdmin, addAgency);
    app.post('/dashboard/add-agencyManger', autht, isAdmin, addAgencyManger);
    app.get('/dashboard/get-agencies', getAgencies);
    app.get('/dashboard/get-vices', getVices);
}