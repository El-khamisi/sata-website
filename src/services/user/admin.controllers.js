const User = require('./user.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readUsers = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await User.find({ name: q.name }).exec();
    } else if (q.role) {
      response = await User.find({ role: q.role }).exec();
    } else if (q.title) {
      response = await User.find({ title: q.title }).exec();
    } else {
      response = await User.find({}).exec();
    }
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.readUser = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await User.findById(_id).exec();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addUser = async (req, res) => {
  try {
    const data = req.body;

    const saved = new User(data);
    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.editUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;
    const response = await User.findByIdAndUpdate(_id, update, { new: true });

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await User.findByIdAndDelete(_id).exec();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
