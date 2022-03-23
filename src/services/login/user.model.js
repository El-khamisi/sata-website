const mongoose = require('mongoose');
const roles = require('../../config/roles');
const status = require('../../config/userStatus');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKENKEY } = require('../../config/env');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, required: [true, 'Email is required'], unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: [true, 'Password is required'] },
    thumbnail: { type: String },
    country: { type: String },
    status: { type: String, enum: { values: Object.values(status), message: 'Provide a correct status' }, default: status.Active },

    role: {
      title: {
        type: String,
        enum: {
          values: Object.values(roles),
          message: 'Provide a correct role',
        },
        default: roles.Customer,
      },
      grants: [
        {
          resource: String,
          create: { type: Boolean, default: false },
          update: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
          read: { type: Boolean, default: false },
        },
      ],
    },
  },
  { strict: false }
);

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    TOKENKEY
  );

  return token;
};

userSchema.pre('save', function (next) {
  if (this.email && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);

    next();
  } else {
    throw new Error('Email and password are REQUIRED');
  }
});


userSchema.post(['save', 'find', 'findByIdAndUpdate', 'findByIdAndDelete', '!findOne'], function (doc, next) {
  
  if (!doc) {
    next();
  } else if (doc.length && doc.length > 0) {
    doc.forEach((e, i) => {
      doc[i].password = undefined;
    });
  } else {
    doc.password = undefined;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
