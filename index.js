const express = require('express');
const mongoose = require('mongoose');


//Config
const {DBURI, DBURI_remote, DEVPORT} = require('./src/config/env');


// const seeder = require('./src/models/seeder.model')



mongoose.connect(DBURI_remote)
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


app.listen(process.argv[2], () => {
  console.log(`connected successfully ON PORT-${process.argv[2]}`);
});


// app.listen(DEVPORT, () => {
//   console.log(`Production connected successfully ON PORT-${DEVPORT}`);
// });
