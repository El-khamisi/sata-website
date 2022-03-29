//import dependencies
const router = require('express').Router();
const Geolocations = require('./geolocation.model');
const { successfulRes, failedRes } = require('../../utils/response');

const { readGeos } = require('./geolocation.controllers');

//Geolocations
router.get('/', async (req, res) => {
  try {
    const response = await Geolocations.find({}).exec();
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
});

module.exports = router;
