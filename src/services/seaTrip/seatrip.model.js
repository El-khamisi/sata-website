const mongoose = require('mongoose');
const { filterByGDS } = require('../../utils/serviceStatics');

const seatripSchema = new mongoose.Schema(
  {
    name: String,
    GDSproviders: {
      type: Map,
      of: String,
    },
  },
  { strict: false }
);

seatripSchema.statics.filterByGDS = async function (gdsName) {
  let response = await filterByGDS(this, gdsName);

  return response;
};
module.exports = mongoose.model('Seatrip', seatripSchema);
