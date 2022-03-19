const { addAdmin, addAgency, addVice, getAgencies, getVices, addAgencyManger } = require('../controllers/adminLogin');
const { authN } = require('../middlewares/authN');
const { isAdmin } = require('../middlewares/authZ');
const User = require('../models/user');

module.exports = (app) => {
  //Admin Routes
  // app.get('/dashboard', authN)
  app.post('/dashboard/add-admin', authN, isAdmin, addAdmin);
  app.post('/dashboard/add-vice', authN, isAdmin, addVice);
  app.post('/dashboard/add-agency', authN, isAdmin, addAgency);
  app.post('/dashboard/add-agencyManger', authN, isAdmin, addAgencyManger);
  app.get('/dashboard/get-agencies', getAgencies);
  app.get('/dashboard/get-vices', getVices);
};
