const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { autht } = require('../middlewares/autht');

const { find } = require('../controllers');
const { logUser, regUser } = require('../controllers/login');
const dashboard = require('./dashboard');
const hotel = require('./hotel');
const { home } = require('../controllers/home');
const flight = require('./flight');

module.exports = (app) => {
  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  //Home Routes
  app.get('/', home);

  //Admin Routes
  dashboard(app);

  flight(app);
  // hotel(app);

  // app.post('/find', find)
  //   //Ordinary customer
  app.post('/signup', regUser);
  //   app.post('/login', logUser);
  //   app.get('/auth',autht);
};
