//import dependencies
const router = require('express').Router();
const mongoose = require('mongoose');
const { successfulRes, failedRes } = require('../../utils/response');

//Roles
router.get('/', async (req, res) => {
  try {
    const response = await mongoose.connection.models.Roles.find({}).exec();
    let rolesTitles = [];
    if (!response) {
      throw new Error('Faild To get Roles');
    } else if (response.length && response.length > 0) {
      response.forEach((e) => {
        rolesTitles.push({ _id: e._id, title: e.title });
      });
    } else {
      rolesTitles = { _id: response._id, title: response.title };
    }

    return successfulRes(res, 200, rolesTitles);
  } catch (e) {
    return failedRes(res, 500, e);
  }
});

module.exports = router;
