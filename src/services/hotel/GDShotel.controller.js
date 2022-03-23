const Hotel = require('./hotel.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readGDSHotel = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Hotel.find({ name: q.name }).exec();
    } else if (q.filterByGDS) {
      response = await Hotel.filterByGDS(q.filterByGDS);
    } else {
      response = await Hotel.find({}).exec();
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.createGDSHotel = async (req, res) => {
  try {
    const add = req.body;

    const saved = new Hotel(add);
    await saved.save();
    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateGDSHotel = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;

    const response = await Hotel.findByIdAndUpdate(_id, update, { new: true }).exec();
    return successfulRes(res, 200, response, `Hotel-${_id} has been updated`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteGDSHotel = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Hotel.findByIdAndDelete(_id).exec();
    return successfulRes(res, 200, response, `Hotel-${_id} has been deleted`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
