const Seatrip = require('./seatrip.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readGDSSeatrip = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Seatrip.find({ name: q.name }).exec();
    } else if (q.filterByGDS) {
      response = await Seatrip.filterByGDS(q.filterByGDS);
    } else {
      response = await Seatrip.find({}).exec();
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.createGDSSeatrip = async (req, res) => {
  try {
    const add = req.body;

    const saved = new Seatrip(add);
    await saved.save();
    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateGDSSeatrip = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;

    const response = await Seatrip.findByIdAndUpdate(_id, update, { new: true }).exec();
    return successfulRes(res, 200, response, `Seatrip-${_id} has been updated`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteGDSSeatrip = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Seatrip.findByIdAndDelete(_id).exec();
    return successfulRes(res, 200, response, `Seatrip-${_id} has been deleted`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
