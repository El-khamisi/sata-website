const mongoose = require('mongoose');

const configShema = new mongoose.Schema({
  name: { type: String, trim: true, unique: true },
  geo_keys: [String],
});

module.exports = mongoose.model('config_keys', geosShema);
