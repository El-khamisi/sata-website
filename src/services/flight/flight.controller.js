const Flight = require('./flight.model');
const { successfulRes, failedRes } = require('../../utils/response');

const getAllowed = (resgrants, body) => {
  const data = {};
  const grants = resgrants;
  if (grants[0] == '*') return body;

  if (!body) return grants;

  for (const [key, value] of Object.entries(body)) {
    if (grants.includes(key)) data[key] = value;
  }
  console.log(data);
  return data;
};

exports.readFlight = async (req, res) => {
  try {
    const read = req.body.read;
    const q = req.query == undefined ? {} : req.query;

    const allowed = getAllowed(res.locals.grants, read);

    let response = await Flight.find(q).select(allowed).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
    else return failedRes(res, 401, e);
  }
};

exports.createFlight = async (req, res) => {
  try {
    const add = req.body.add;

    const saved = new Flight(add);
    await saved.save();
    return successfulRes(res, 200, saved);
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
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
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
    else return failedRes(res, 401, e);
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const remove = req.body.delete;

    const response = await Flight.findOneAndDelete(remove).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
    else return failedRes(res, 401, e);
  }
};
