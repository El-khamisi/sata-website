const mongoose = require('mongoose');
const { filterByGDS } = require('../../utils/serviceStatics');

const flightSchema = new mongoose.Schema(
  {
    name: String,
    url: String
  },
  { strict: false }
);


flightSchema.statics.filterByGDS = async function (gdsName) {
  let response = await filterByGDS(this, gdsName);

  return response;
};
module.exports = mongoose.model('Flight', flightSchema);
