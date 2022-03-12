const mongoose = require('mongoose'); 

const sech = new mongoose.Schema({
    name: String,
    age: Number
}, {strict: false});


const model = mongoose.model('User', sech);
module.exports = model;