const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const model = require('./models')


const PORT = process.env.DEVPORT || 5050;
const dburi = process.env.DB;
const app = express();
app.use(express.json())

mongoose.connect(dburi)
.then(()=>{
    console.log('connected to database successfully')
}).catch(()=>{
    console.log('can\'t connect')
})

app.get('/get', async(req, res)=>{
    
    const fetched = await model.find({});
    res.json(fetched);
})


app.post('/add', async(req, res)=>{
    
   
    const nUser = new model(req.body);
    const saved = await nUser.save();


    res.json(saved);

})


app.get('*', ()=>{
    console.log('server has been hited')
});

app.listen(PORT, ()=>{
    console.log(`connected successfully ON-${PORT}`)
});