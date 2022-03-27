const mongoose = require('mongoose');
const { filterByGDS } = require('../../utils/serviceStatics');

const hotelSchema = new mongoose.Schema(
  {
    name: String,
    url: String
  },
  { strict: false }
);


hotelSchema.statics.filterByGDS = async function (gdsName) {
  let response = await filterByGDS(this, gdsName);

  return response;
};
module.exports = mongoose.model('Hotel', hotelSchema);
