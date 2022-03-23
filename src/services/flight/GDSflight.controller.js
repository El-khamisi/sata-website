const Flight = require('./flight.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readGDSFlight = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Flight.find({ name: q.name }).exec();
    } else if (q.filterByGDS) {
      response = await Flight.filterByGDS(q.filterByGDS);
    } else {
      response = await Flight.find({}).exec();
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.createGDSFlight = async (req, res) => {
  try {
    const add = req.body;

    const saved = new Flight(add);
    await saved.save();
    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateGDSFlight = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;

    const response = await Flight.findByIdAndUpdate(_id, update, { new: true }).exec();
    return successfulRes(res, 200, response, `Flight-${_id} has been updated`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteGDSFlight = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Flight.findByIdAndDelete(_id).exec();
    return successfulRes(res, 200, response, `Flight-${_id} has been deleted`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
