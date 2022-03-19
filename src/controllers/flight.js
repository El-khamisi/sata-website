const Flight = require('../models/flight');
const { successfulRes, failedRes } = require('../utils/response');

const getAllowed = (resgrants, body) => {
  const data = {};
  const grants = resgrants;
  if (grants == ['*']) return body;
  if (body) return grants;

  for (const [key, value] of Object.entries(body)) {
    if (grants.includes(key)) data[key] = value;
  }
  return data;
};

exports.readFlight = async (req, res) => {
  try {
    const read = req.body.read;
    const q = req.body.q == undefined ? {} : req.body.q;

    const allowed = getAllowed(res.locals.grants, read);
    let response = await Flight.find(q).select(allowed).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 505, e);
    else return failedRes(res, 401, e);
  }
};

exports.createFlight = async (req, res) => {
  try {
    const add = req.body.add;
    const allowed = getAllowed(res.locals.grants, add);

    const saved = new Flight(allowed);
    await saved.save();
    return successfulRes(res, 200, saved);
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 505, e);
    else return failedRes(res, 401, e);
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const old = req.body.old;
    const update = req.body.update;

    const allowed = getAllowed(res.locals.grants, update);
    const response = await Flight.findOneAndUpdate(old, allowed, { new: true }).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 505, e);
    else return failedRes(res, 401, e);
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const remove = req.body.delete;
    const allowed = getAllowed(res.locals.grants, remove);
    const response = await Flight.findByIdAndDelete().exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 505, e);
    else return failedRes(res, 401, e);
  }
};
