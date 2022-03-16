const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { logUser, regUser } = require('../controllers/login');
const { autht } = require('../middlewares/autht');

const {find} =require('../controllers')
const dashboard = require('./dashboard');
const hotel = require('./hotel');

module.exports = (app) => {
  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());


//Admin Routes
dashboard(app);
hotel(app);

// app.post('/find', find)
//   //Ordinary customer
//   app.post('/signup', regUser);
//   app.post('/login', logUser);
//   app.get('/auth',autht);
};
