const mongoose = require('mongoose');
const { resources } = require('../../config/resources');

const roleSchema = mongoose.Schema({
  title: { type: String, unique: true },
  grants: [
    {
      resource: String,
      create: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      read: { type: Boolean, default: false },
    },
  ],
});

roleSchema.pre('save', function (next) {
  if (!this.grants) {
    next();
  } else {
    const resKeys = Object.keys(resources);

    this.grants.forEach((e) => {
      console.log(resKeys.includes(e.resource));
      if (!resKeys.includes(e.resource)) throw new Error(`Invalid resource name - ${e}`);
    });
  }
  next();
});

module.exports = {
  Roles: mongoose.model('Roles', roleSchema),
  roleSchema,
};
