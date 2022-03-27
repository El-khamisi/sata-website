const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    flag: { type: String, trim: true },
    code: { type: String, trim: true },
    key: { type: String, trim: true },
    language: { type: String, trim: true },
    currency: { type: String, trim: true },
  },
  { strict: false }
);

module.exports = mongoose.model('Geolocations', geoSchema);
