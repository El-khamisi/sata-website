const Geolocations = require('./geolocation.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readGeos = async (req, res) => {
  try {
    const response = await Geolocations.find({}).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.readGeo = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Geolocations.findById(_id).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addGeo = async (req, res) => {
  try {
    const data = req.body;

    const saved = new Geolocations(data);
    await saved.save();

    return successfulRes(res, 200, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.editGeo = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;
    const response = await Geolocations.findByIdAndUpdate(_id, update, { new: true });

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteGeo = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Geolocations.findByIdAndDelete(_id).exec();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
