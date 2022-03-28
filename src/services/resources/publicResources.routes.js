//import dependencies
const router = require('express').Router();

const { resources } = require('../../config/resources');
const { successfulRes } = require('../../utils/response');

//Resources
router.get('/', (req, res) => {
  const arr =  Object.keys(resources);
  let response = [];
  for(const i of arr ){
    response.push({
      resource: i,
      create: false,
      update: false,
      delete: false,
      read: false
    })
  }

  return successfulRes(res, 200, response);
});

module.exports = router;
