const mongoose = require('mongoose');
const { filterByGDS } = require('../../utils/serviceStatics');

const carSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
  },
  { strict: false }
);

carSchema.statics.filterByGDS = async function (gdsName) {
  let response = await filterByGDS(this, gdsName);

  return response;
};

module.exports = mongoose.model('Car', carSchema);
