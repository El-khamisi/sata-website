const mongoose = require('mongoose');

const agencyShema = new mongoose.Schema(
  {
    nameOfAgency: { type: String, required: [true, 'Name of Agency is required'] },
    nameOfAdmin: { type: String, trim: true, required: [true, 'Name of Agency Admin is required'] },
    email: { type: String, trim: true, required: [true, 'Email is required'], unique: true, lowercase: true },
    password: { type: String },
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
    title: { type: String },
    role: {
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

agencyShema.methods.generateToken = function () {
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

agencyShema.pre('save', function (next) {
  if (this.email && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);

    next();
  } else {
    throw new Error('Email and password are REQUIRED');
  }
});

agencyShema.post(['save', 'find', 'findByIdAndUpdate', 'findByIdAndDelete', '!findOne'], function (doc, next) {
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
