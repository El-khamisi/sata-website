const User = require('../login/user.model');
const Agency = require('../agency/agency.model');
const { Admin, Vice, Agency_Admin, Agency_Manager } = require('../../config/roles');
const { successfulRes, failedRes } = require('../../utils/response');

exports.addAdmin = async (req, res) => {
  try {
    const data = req.body;
    data.role.title = Admin;
    const saved = new User(data);
    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addVice = async (req, res) => {
  try {
    const data = req.body;
    data.role.title = Vice;
    const saved = new User(data);
    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addAgency = async (req, res) => {
  try {
    const data = req.body;
    data.role.title = Agency_Admin;
    const saved = new Agency(data);
    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addAgencyManger = async (req, res) => {
  try {
    const data = req.body;
    data.role.title = Agency_Manager;
    const saved = new Agency(data);
    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.getAgencies = async (req, res) => {
  try {
    const data = await Agency.find({ 'role.title': Agency_Admin }).exec();

    return successfulRes(res, 200, data);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.getVices = async (req, res) => {
  try {
    const data = await User.find({ 'role.title': Vice }).exec();

    return successfulRes(res, 200, data);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
