const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//configuration
const { TOKENKEY } = require('../../config/env');
const status = require('../../config/userStatus');
const titles = require('../../config/titles');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, required: [true, 'Email is required'], unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: [true, 'Password is required'] },
    thumbnail: { type: String },
    country: { type: String },
    status: { type: String, enum: { values: Object.values(status), message: 'Provide a correct status' }, default: status.Active },
    title: { type: String, enum: { values: Object.values(titles), message: 'Provide a correct Title name' }, default: titles.Customer },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles'},
  },
  { strict: false }
);

userSchema.methods.generateToken = async function () {
  const doc = await this.populate('role');
  const token = jwt.sign(
    {
      id: doc._id,
      email: doc.email,
      title: doc.title,
      role: doc.role,
    },
    TOKENKEY
  );

  return token;
};

userSchema.pre('save', async function (next) {
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
userSchema.post(['save', 'find', 'findByIdAndUpdate', 'findByIdAndDelete'], function (doc, next) {
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
