const mongoose = require('mongoose');
const { filterByGDS } = require('../../utils/serviceStatics');

const insuranceSchema = new mongoose.Schema(
  {
    name: String,
    GDSproviders: {
      type: Map,
      of: String,
    },
  },
  { strict: false }
);

insuranceSchema.statics.filterByGDS = async function (gdsName) {
  let response = await filterByGDS(this, gdsName);

  return response;
};
module.exports = mongoose.model('insurance', insuranceSchema);
