const mongoose = require('mongoose');
const roles = require('../config/roles');


const agencyShema = new mongoose.Schema(
  {
    nameOfAgency: { type: String },
    nameOfAdmin: { type: String },
    email: { type: String },
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
    role: {
      title: {
        type: String,
        enum: {
          values: Object.values(roles),
          message: 'Provide a correct role',
        },
        default: roles.Guest,
      },
      grants: [
        {
          resource: String,
          create: [String], update: [String],
          delete: [String], read: [String]
        },
      ],
    },
  },
  
  { strict: false }
)


agencyShema.methods.generateToken = function(){
  const token = jwt.sign({
    id: this._id,
    nameOfAgency: this.email,
    role: this.role.title
  },
  TOKENKEY);
  
  return token;
}

agencyShema.pre('save', function(next){
  
  if (this.email && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);

    next();
  }else{
    throw new Error('Email and password are REQUIRED');
  }

})


module.exports = mongoose.model(
  'Agency',
  agencyShema 
);

