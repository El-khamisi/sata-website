const { Admin } = require('../config/roles');
const User = require('./user');

const seeder = async () => {
  const prototype = {
    name: 'Admin',
    email: 'admin@test.com',
    phone: '+26443686',
    password: 'admin123',
    thumbnail: 'thumbnail.com',
    country: 'egypt',
    role: {
      title: Admin,
    },
  };
  try {
    const saved = new User(prototype);
    await saved.save();

    const token = saved.generateToken();
  } catch (e) {
    console.log(e.message);
  }
};
seeder();
