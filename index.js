const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');



const router = require('./src/routes');

const {DBURI, DEVPORT} = require('./src/config/env');
const seeder = require('./src/models/index');



mongoose
  .connect(DBURI)
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch(() => {
    console.log("can't connect");
});

//Create Application
const app = express()

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


//Routers
router(app);

app.listen(DEVPORT, () => {
  console.log(`connected successfully ON-${DEVPORT}`);
});
