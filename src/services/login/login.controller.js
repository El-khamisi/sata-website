const User = require('./user.model');
const Agency = require('../agency/agency.model');
const bcrypt = require('bcrypt');
const { successfulRes, failedRes } = require('../../utils/response');

exports.regUser = async (req, res) => {
  try {
    const saved = new User(req.body);
    await saved.save();

    const token = saved.generateToken();
    return successfulRes(res, 201, { saved, token });
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.logUser = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return failedRes(res, 400, null, 'Email and password are REQUIRED');
  }

  try {
    let logged = await User.findOne({ email }).exec();
    if (!logged) {
      return failedRes(res, 400, null, 'Email is invalid');
    }

    const matched = bcrypt.compareSync(password, logged.password);
    if (!logged || !matched) {
      return failedRes(res, 400, null, 'Email or Password is invalid');
    }
    const token = logged.generateToken();
    return successfulRes(res, 201, { user: logged, token });
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.regAgency = async (req, res) => {
  try {
    const saved = new Agency(req.body);
    await saved.save();

    const token = saved.generateToken();
    return successfulRes(res, 201, { saved, token });
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.logAgency = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return failedRes(res, 400, null, 'Email and password are REQUIRED');
  }

  try {
    let logged = await Agency.findOne({ email }).exec();
    const matched = bcrypt.compareSync(password, logged.password);
    if (!matched || !logged) {
      return failedRes(res, 400, null, 'Email or Password is invalid');
    }

    const token = logged.generateToken();
    return successfulRes(res, 201, { saved, token });
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
