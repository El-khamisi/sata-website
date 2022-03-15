const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const {DBURI, DEVPORT} = require('./config');
const roles = require('./src/dashboard/roles');
const routes = require('./src/routes')



const app = express();

mongoose
  .connect(DBURI)
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch(() => {
    console.log("can't connect");
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get('/hello', (req, res, next)=>{
  res.set('host', 'nut');
  next();
}, (req, res)=>{res.json({req:req.headers, res: res.get('host')})})


app.get('/add', async(_req, res) => {
  
  
  const pop = permissions.can('admin').readAny('m');

  User.find({}, function(err, data){
    if(err) res.send('err')

    const date = data.filter((x)=>x._doc)
    res.json(pop.filter(date[0]._doc))

  });
  
  

});

app.listen(DEVPORT, () => {
  console.log(`connected successfully ON-${DEVPORT}`);
});
