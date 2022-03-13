const mongoose = require('mongoose');
const roles = require('../dashboard/roles');


const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      role: {
        type: String,
        enum: {
          values: Object.values(roles),
          message: 'Provide a correct role',
        },
        default: 'R3Vlc3Q=',
      },
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      encryptedPassword: { type: String },
      thumbnail: { type: String },
      country: { type: String },
    },
    { strict: false }
  )
);

module.exports = User;
