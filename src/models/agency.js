const mongoose = require('mongoose');
const roles = require('../dashboard/roles');

const Agency = mongoose.model(
  'Agency',
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
      nameOfAgency: { type: String },
      nameOfAdmin: { type: String },
      email: { type: String },
      encryptedPassword: { type: String },
      thumbnail: { type: String },
      addresses: { type: [String] },
      country: { type: String },
      CRN: {
        number: { type: Number },
        thumbnail: { type: String },
        expDate: { type: Date },
      },
      taxCard: {
        number: { type: Number },
        thumbnail: { type: String },
        expDate: { type: Date },
      },
    },
    { strict: false }
  )
);

module.exports = Agency;
