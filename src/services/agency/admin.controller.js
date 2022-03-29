const Agency = require('./agency.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readAgencys = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Agency.find({ name: q.name }).exec();
    } else if (q.role) {
      response = await Agency.find({ role: q.role }).exec();
    } else if (q.title) {
      response = await Agency.find({ title: q.title }).exec();
    } else {
      response = await Agency.find({}).exec();
    }
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.readAgency = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Agency.findById(_id).exec();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addAgency = async (req, res) => {
  try {
    const data = req.body;

    const saved = new Agency(data);
    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.editAgency = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;
    const response = await Agency.findByIdAndUpdate(_id, update, { new: true });

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 505, e);
  }
};

exports.deleteAgency = async (req, res) => {
  try {
    const _id = req.params.id;

    const data = await Agency.findByIdAndDelete(_id).exec();

    return successfulRes(res, 200, data);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
