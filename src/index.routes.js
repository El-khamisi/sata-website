const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// const passport = require('passport');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const {TOKENKEY} = require('../src/config/env');

// Routes
const agency = require('./services/agency/agency.routes');
const cars = require('./services/car/car.routes');
const admin = require('./services/dashboard/admin.routes');
const flights = require('./services/flight/flights.routes');
const hotels = require('./services/hotel/hotels.routes');
const insurances = require('./services/insurance/insurance.routes');

const seaTrips = require('./services/seaTrip/seatrip.routes');
const tourPackages = require('./services/tourPackage/tourpackage.routes');

// Need to require the entire Passport config module so app.js knows about it
// require('./config/passport');

module.exports = (app) => {
  // Middlewares

  /*        
    app.use(session({
        secret: TOKENKEY,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create(mongoose.connection),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
*/

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  //Routers
  app.use(morgan('dev'));

  // app.use('/agency', agency);
  app.use('/cars', cars);
  app.use('/dashboard/admin', admin);
  // app.use('/dashboard/vice', dashboard);

  app.use('/flights', flights);
  app.use('/hotels', hotels);
  app.use('/insurances', insurances);

  app.use('/seatrips', seaTrips);
  app.use('/tourpackages', tourPackages);

  const log = require('./services/login/login.routes');
  app.use(log);
};

