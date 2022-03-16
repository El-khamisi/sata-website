const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {type: String},
    roomInformation: {type: String},
    options: {type: Map, of: String},
    location: {type: String},
    service: {type: Map, of: String}
}, {strict: false})


module.exports = mongoose.model(
    'Hotel',
    hotelSchema
)