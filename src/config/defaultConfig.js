const User = require('../services/user/user.model');
const { rolesSeeder, Admin } = require('./roles');

const superAdmin = async () => {
  const prototype = {
    name: 'Admin',
    email: 'admin@test.com',
    phone: '+26443686',
    password: 'admin123',
    thumbnail: 'thumbnail.com',
    country: 'egypt',
    role: Admin,
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
    await rolesSeeder();
    await superAdmin();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  seeder,
};
