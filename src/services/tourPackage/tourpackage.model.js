const mongoose = require('mongoose');
const { filterByGDS } = require('../../utils/serviceStatics');

const tourpackageSchema = new mongoose.Schema(
  {
    name: String,
    GDSproviders: {
      type: Map,
      of: String,
    },
  },
  { strict: false }
);

tourpackageSchema.statics.filterByGDS = async function (gdsName) {
  let response = await filterByGDS(this, gdsName);

  return response;
};
module.exports = mongoose.model('Tourpackage', tourpackageSchema);
