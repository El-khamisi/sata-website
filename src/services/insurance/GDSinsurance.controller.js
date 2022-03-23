const Insurance = require('./insurance.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readGDSInsurance = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Insurance.find({ name: q.name }).exec();
    } else if (q.filterByGDS) {
      response = await Insurance.filterByGDS(q.filterByGDS);
    } else {
      response = await Insurance.find({}).exec();
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.createGDSInsurance = async (req, res) => {
  try {
    const add = req.body;

    const saved = new Insurance(add);
    await saved.save();
    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateGDSInsurance = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;

    const response = await Insurance.findByIdAndUpdate(_id, update, { new: true }).exec();
    return successfulRes(res, 200, response, `Insurance-${_id} has been updated`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteGDSInsurance = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Insurance.findByIdAndDelete(_id).exec();
    return successfulRes(res, 200, response, `Insurance-${_id} has been deleted`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
