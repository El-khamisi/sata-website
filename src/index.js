const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./dashboard/config');
require('dotenv').config();

const PORT = process.env.DEVPORT || 5050;
const dburi = process.env.DB;
const app = express();

mongoose
  .connect(dburi)
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch(() => {
    console.log("can't connect");
});

// Middlewares
app.use(express.json());
authRouter(app);

// app.use('/sata', authRouter)
app.post('/hi', (req, res)=>{
    console.log('hi')
    res.send('hi server')
})




app.get('/add', (_req, res) => {
  console.log('server has been hited');
  res.send('Hi Server');
});

app.listen(PORT, () => {
  console.log(`connected successfully ON-${PORT}`);
});
