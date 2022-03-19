//import dependencies
const morgan = require('morgan');


// middlewares
const { authN } = require('../middlewares/authN');

// controllers
const dashboard = require('./dashboard');
const flights = require('./flights');
const hotels = require('./hotels');

const { logUser, regUser } = require('../controllers/login');

const { home } = require('../controllers/home');


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
