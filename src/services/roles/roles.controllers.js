const Roles = require('./roles.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readRoles = async (req, res) => {
  try {
    const response = await Roles.find({}).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.readRole = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Roles.findById(_id).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addRole = async (req, res) => {
  try {
    const data = req.body;

    const saved = new Roles(data);
    await saved.save();

    return successfulRes(res, 200, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.editRole = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;
    const response = await Roles.findByIdAndUpdate(_id, update, { new: true });

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Roles.findByIdAndDelete(_id).exec();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
