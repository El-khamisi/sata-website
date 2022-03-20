const jwt = require('jsonwebtoken');
const { TOKENKEY } = require('../config/env');
const { failedRes } = require('../utils/response');


exports.authN = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, TOKENKEY);

    res.locals.token = verify;
    next();
  } catch (e) {
    return failedRes(res, 404, e);
  }
  
};
