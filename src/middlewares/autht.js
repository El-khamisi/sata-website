const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {TOKENWORD} = require('../../config');

exports.autht =  (req, res, next)=>{

    const token = req.headers['auth-token'];
    res.json(token)
}