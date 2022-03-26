const express = require('express');
const mongoose = require('mongoose');


//Config
const {DBURI, DBURI_remote, DEVPORT} = require('./src/config/env');


// const seeder = require('./src/models/seeder.model')



mongoose.connect(DBURI)
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch(() => {
    console.log("can't connect");
});

//Create Application
const app = express()

const endpoints = require('./src/index.routes');
endpoints(app);



app.listen(DEVPORT, () => {
  console.log(`connected successfully ON-${DEVPORT}`);
});
