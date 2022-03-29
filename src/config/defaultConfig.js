const User = require('../services/user/user.model');
const { Admin } = require('./titles');

const superAdmin = async () => {
  await User.findOneAndDelete({email: 'admin@test.com'}).exec();
  const prototype = {
    name: 'Admin',
    email: 'admin@test.com',
    phone: '+26443686',
    password: 'admin123',
    thumbnail: 'thumbnail.com',
    country: 'egypt',
    title: Admin,
  };
  try {
    const saved = new User(prototype);
    await saved.save();

    const token = saved.generateToken();
  } catch (e) {
    throw new Error('CAN NOT CREATE SUPER ADMIN' + e);
  }
};

const seeder = async () => {
  try {
    await superAdmin();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  seeder,
};
