const router = require('express').Router();
const controller = require('../controllers/index');
const {logUser, regUser} =require('../controllers/login');
const {autht} = require('../middlewares/autht');

//Ordinary customer
router.post('/signup', regUser, autht);
router.post('/login', logUser, autht);


// //Admin Routes
// router.get('/dashboard', controller);
// router.post('/dashboard/add-admin', controller);
// router.post('/dashboard/add-vice', controller);
// router.post('/dashboard/add-agency', controller);
// router.get('/dashboard/get-agencies', controller);
// router.get('/dashboard/get-vices', controller);


// //Agency 
// router.post('/asignup', controller.regAgency);
// router.post('/alogin', controller.logAgency);

// router.get('/home', );


module.exports = router;