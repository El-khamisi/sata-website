const mongoose = require('mongoose');
const { Admin } = require('../config/roles');
const { failedRes } = require('../utils/response');

exports.isAdmin = (req, res, next) => {
  try {
    const role = res.locals.user.role;

    if (role && role == Admin) return next();
    else throw new Error('You are NOT authorized to Admin Only Routes');
  } catch (err) {
    return failedRes(res, 401, e);
  }
};

exports.canCreate = (resource) => {
  return async (req, res, next) => {
    try {
      const role = res.locals.user.role;
      if (role == Admin) return next();
      const response = await mongoose.connection.model.Roles.findOne({ title: role }).exec();

      response.grants.forEach((e) => {
        if (e.resource == resource) {
          if (e.create) return next();
          else throw new Error('You are NOT authorized to READ');
        }
      });
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};

exports.canRead = (resource) => {
  return async (req, res, next) => {
    try {
      const role = res.locals.user.role;
      if (role == Admin) return next();
      const response = await mongoose.connection.model.Roles.findOne({ title: role }).exec();

      response.grants.forEach((e) => {
        if (e.resource == resource) {
          if (e.read) return next();
          else throw new Error('You are NOT authorized to READ');
        }
      });
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};

exports.canUpdate = (resource) => {
  return async (req, res, next) => {
    try {
      const role = res.locals.user.role;
      if (role == Admin) return next();
      const response = await mongoose.connection.model.Roles.findOne({ title: role }).exec();

      response.grants.forEach((e) => {
        if (e.resource == resource) {
          if (e.update) return next();
          else throw new Error('You are NOT authorized to READ');
        }
      });
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};

exports.canDelete = (resource) => {
  return async (req, res, next) => {
    try {
      const role = res.locals.user.role;
      if (role == Admin) return next();
      const response = await mongoose.connection.model.Roles.findOne({ title: role }).exec();

      response.grants.forEach((e) => {
        if (e.resource == resource) {
          if (e.delete) return next();
          else throw new Error('You are NOT authorized to READ');
        }
      });
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};
