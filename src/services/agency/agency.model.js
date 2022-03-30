const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//configuration
const { TOKENKEY } = require('../../config/env');
const status = require('../../config/userStatus');
const { Manager } = require('../../config/titles');

const agencyShema = new mongoose.Schema(
  {
    nameOfAgency: { type: String, required: [true, 'Name of Agency is required'] },
    nameOfAdmin: { type: String, trim: true, required: [true, 'Name of Agency Admin is required'] },
    email: { type: String, trim: true, required: [true, 'Email is required'], unique: true, lowercase: true },
    password: { type: String, required: [true, 'Password is required'] },
    thumbnail: { type: String },
    addresses: { type: String },
    country: { type: String },
    CRN: {
      number: { type: String },
      thumbnail: { type: String },
      expDate: { type: Date },
    },
    taxCard: {
      number: { type: String },
      thumbnail: { type: String },
      expDate: { type: Date },
    },
    status: { type: String, enum: { values: Object.values(status), message: 'Provide a correct status' }, default: status.Active },
    title: { type: String, enum: { values: [Manager], message: 'Provide a correct Title name' }, default: Manager },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
    assistants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { strict: false }
);

agencyShema.methods.generateToken = async function () {
  const doc = await this.populate('role');
  const token = jwt.sign(
    {
      id: doc._id,
      email: doc.email,
      nameOfAgency: doc.nameOfAgency,
      nameOfAdmin: doc.nameOfAdmin,
      thumbnail: doc.thumbnail,
      title: doc.title,
      role: doc.role,
    },
    TOKENKEY
  );

  return token;
};

agencyShema.pre('save', async function (next) {
  //Roles validation
  if (this.role) {
    const response = await mongoose.connection.models.Roles.findById(this.role).exec();
    if (!response || response == null) throw new Error('Invalid role name');
  }

  if (this.email && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);

    next();
  } else {
    throw new Error('Email and password are REQUIRED');
  }
});

//Exclude findOne for Login password
agencyShema.post(['save', 'find', 'findByIdAndUpdate', 'findByIdAndDelete'], function (doc, next) {
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

module.exports = mongoose.model('Agency', agencyShema);
