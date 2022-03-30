require('dotenv').config();

module.exports = {
  DEVPORT: process.env.DEVPORT,
  DBURI: process.env.DBURI,
  TOKENKEY: process.env.TOKENWORD,

  cloudinary_name: process.env.cloudinary_name,
  cloudinary_api_key: process.env.cloudinary_api_key,
  cloudinary_api_secret: process.env.cloudinary_api_secret,
};
