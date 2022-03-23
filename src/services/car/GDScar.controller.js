const Car = require('./car.model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.readGDSCar = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Car.find({ name: q.name }).exec();
    } else if (q.filterByGDS) {
      response = await Car.filterByGDS(q.filterByGDS);
    } else {
      response = await Car.find({}).exec();
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.createGDSCar = async (req, res) => {
  try {
    const add = req.body;

    const saved = new Car(add);
    await saved.save();
    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateGDSCar = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;

    const response = await Car.findByIdAndUpdate(_id, update, { new: true }).exec();
    return successfulRes(res, 200, response, `Car-${_id} has been updated`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteGDSCar = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Car.findByIdAndDelete(_id).exec();
    return successfulRes(res, 200, response, `Car-${_id} has been deleted`);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
