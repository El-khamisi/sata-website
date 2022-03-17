const mongoose = require('mongoose');
const roles = require('../config/roles');
const status = require('../config/userStatus');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKENKEY } = require('../config/env');


const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    thumbnail: { type: String },
    country: { type: String },
    status: { type: String, enum: { values: Object.values(status), message: 'Provide a correct status' } ,
    default: status.Active,},

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
          create: [String], update: [String],
          delete: [String], read: {type:[String], default: ['*']}
        },
      ],
    },
   
  },
  { strict: false }
);


userSchema.methods.generateToken = function(){
  const token = jwt.sign({
    id: this._id,
    email: this.email,
    role: this.role
  },
  TOKENKEY);
  
  return token;
}


userSchema.pre('save', function(next){
  
  if (this.email && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);

    next();
  }else{
    throw new Error('Email and password are REQUIRED');
  }

})


userSchema.post(/^find/, function(doc, next){
  
  // console.log(doc.length)
  // if(doc.length && doc.length>0)
  //   doc.forEach(e=> e.role = undefined)
  // else
  //   doc.role = undefined

  next();
})



module.exports = mongoose.model(
  'User',
  userSchema
);