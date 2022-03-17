const express = require('express');
const mongoose = require('mongoose');
const {DBURI, DEVPORT} = require('./src/config/env');
const router = require('./src/routes');



const app = express();


mongoose
  .connect(DBURI)
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch(() => {
    console.log("can't connect");
});

const seeder = require('./src/models/index');
router(app);

app.listen(DEVPORT, () => {
  console.log(`connected successfully ON-${DEVPORT}`);
});
