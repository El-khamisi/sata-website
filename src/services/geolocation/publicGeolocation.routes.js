//import dependencies
const router = require('express').Router();
const mongoose = require('mongoose');
const { successfulRes, failedRes } = require('../../utils/response');


const {readGeos} = require('./geolocation.controllers')

//Roles
router.get('/', async (req, res) => {
  try {
    const response = await mongoose.connection.models.Geolocations.find({}).exec();
    let geosNames = [];
    if (!response) {
      throw new Error('Faild To get Geolocation');
    } else if (response.length && response.length > 0) {
        response.forEach((e)=>{
            geosNames.push({_id: e._id, name: e.name})
          })
    } else {
      geosNames = {_id: response._id, name: response.name}
    }

    return successfulRes(res, 200, geosNames);
  } catch (e) {
    return failedRes(res, 500, e);
  }
});

router.get('/geoslist', readGeos);


module.exports = router;
