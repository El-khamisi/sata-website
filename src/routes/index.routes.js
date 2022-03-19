//import dependencies
const morgan = require('morgan');


// middlewares
const { authN } = require('../middlewares/authN');

// controllers
const dashboard = require('../services/dashboard/dashboard.routes');
const flights = require('../services/flight/flights.routes');
const hotels = require('../services/hotel/hotels.routes');

const { logUser, regUser } = require('../controllers/login.controller');

const { home } = require('../controllers/home.controller');


module.exports = (app) => {



  app.get('/', (req, res)=>{
    
    res.send('hi server')
  })

  app.use(morgan('dev'))
    
  app.use('/dashboard', dashboard);
  app.use('/flights', flights);
  app.use('/hotels', hotels);

  // //Home Routes
  // app.get('/', home);

  
  //   app.post('/login', logUser);
  //   app.post('/signup',regUser);

  


};
