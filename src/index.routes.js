const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {TOKENKEY} = require('../src/config/env');

// Routes
const dashboard = require('./services/dashboard/dashboard.routes');
const flights = require('./services/flight/flights.routes');
const hotels = require('./services/hotel/hotels.routes');

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

module.exports = (app)=>{
    
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
    app.use(morgan('dev'))
        
    app.use('/dashboard', dashboard);
    app.use('/flights', flights);
    app.use('/hotels', hotels);
    const log = require('./services/dashboard/login.routes')
    app.use(log)

}