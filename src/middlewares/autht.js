const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKENKEY } = require('../config/env');
const { failedRes } = require('../utils/response');
const { Admin } = require('../config/roles');

exports.autht = (req, res, next) => {
  
  try{
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, TOKENKEY);

    res.locals.token = verify;
    
    next();
  }catch(e){
    return failedRes(res, 404, e);
  }
  
};
