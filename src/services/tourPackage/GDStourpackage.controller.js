const Tourpackage = require('./tourpackage.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readGDSTourpackage = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Tourpackage.find({ name: q.name }).exec();
    } else if (q.filterByGDS) {
      response = await Tourpackage.filterByGDS(q.filterByGDS);
    } else {
      response = await Tourpackage.find({}).exec();
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.createGDSTourpackage = async (req, res) => {
  try {
    const add = req.body;

    const saved = new Tourpackage(add);
    await saved.save();
    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateGDSTourpackage = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;

    const response = await Tourpackage.findByIdAndUpdate(_id, update, { new: true }).exec();
    return successfulRes(res, 200, response, `Tourpackage-${_id} has been updated`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteGDSTourpackage = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Tourpackage.findByIdAndDelete(_id).exec();
    return successfulRes(res, 200, response, `Tourpackage-${_id} has been deleted`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
