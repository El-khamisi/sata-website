const User = require('../services/login/user.model');
const { Admin } = require('../config/roles');
const { failedRes } = require('../utils/response');

const gitContent = (res) => {
  let title = res.locals.user.role.title;
  let grants = res.locals.user.role.grants;
  return { title, grants };
};

exports.isAdmin = async (req, res, next) => {
  try {
    const id = res.locals.user.id;
    const role = res.locals.user.role.title;
    if (role && role == Admin) {
      next();
    } else {
      return failedRes(res, 401, null, 'You are NOT An Admin');
    }
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.canCreate = (resource) => {
  return (req, res, next) => {
    try {
      let { title, grants } = gitContent(res);

      if (title && title == Admin) {
        res.locals.grants = true;
        return next();
      }

      grants = grants.find((e) => e.resource == resource);
      if (grants.create) {
        res.locals.grants = grants.create;
        return next();
      } else {
        throw new Error('You are NOT authorized to CREATE');
      }
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};

exports.canRead = (resource) => {
  return (req, res, next) => {
    try {
      let { title, grants } = gitContent(res);

      if (title && title == Admin) {
        res.locals.grants = true;
        return next();
      }

      grants = grants.find((e) => e.resource == resource);
      if (grants.read) {
        res.locals.grants = grants.read;
        return next();
      } else {
        throw new Error('You are NOT authorized to READ');
      }
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};

exports.canUpdate = (resource) => {
  return (req, res, next) => {
    try {
      let { title, grants } = gitContent(res);

      if (title && title == Admin) {
        res.locals.grants = true;
        return next();
      }

      grants = grants.find((e) => e.resource == resource);
      if (grants.update) {
        res.locals.grants = grants.update;
        return next();
      } else {
        throw new Error('You are NOT authorized to UPDATE');
      }
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};

exports.canDelete = (resource) => {
  return (req, res, next) => {
    try {
      let { title, grants } = gitContent(res);

      if (title && title == Admin) {
        res.locals.grants = true;
        return next();
      }

      grants = grants.find((e) => e.resource == resource);
      if (grants.delete) {
        res.locals.grants = grants.delete;
        return next();
      } else {
        throw new Error('You are NOT authorized to DELETE');
      }
    } catch (e) {
      if (e instanceof ReferenceError) return failedRes(res, 505, e);
      else return failedRes(res, 401, e);
    }
  };
};
