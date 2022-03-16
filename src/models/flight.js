const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name: {type: String},
    airlines: {type: [String]},
    departing: {type: String},
    arriving: {type: String},
    tripDuration: {type: String},
    flightAmenities: {type: Map, of: String}
}, { strict: false })


module.exports = mongoose.model(
    'Flight',
    flightSchema
)