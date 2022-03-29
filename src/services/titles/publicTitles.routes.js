////import dependencies
const router = require('express').Router();

const { titles } = require('../../config/titles');
const { successfulRes } = require('../../utils/response');

//Ttitles
router.get('/', (req, res) => {
  const arr = Object.keys(titles);
  return successfulRes(res, 200, arr);
});

module.exports = router;
