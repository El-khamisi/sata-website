const mongoose = require('mongoose');
const roles = require('../dashboard/roles');


const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      role: {
        title:{type: String,
        enum: {
          values: Object.values(roles),
          message: 'Provide a correct role',
        },
        default: roles.Customer,},
        grants:[{
          resName: String,
          createAny: [String],
          readAny: [String],
          deleteAny: [String],
          updateAny: [String],
          createOwn: [String],
          readOwn: [String],
          deleteOwn: [String],
          updateOwn: [String]
        }]
      },
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      password: { type: String },
      thumbnail: { type: String },
      country: { type: String },
    },
    { strict: false }
  )
);

module.exports = User;
