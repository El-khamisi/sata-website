const Roles = require('../services/roles/roles.model');

const seederAdmin = {
  Admin: 'Admin',
};

const rolesSeeder = async () => {
  const search = await Roles.findOne({ title: seederAdmin.Admin }).exec();

  try {
    if (!search) {
      const defaultRoles = new Roles({
        title: seederAdmin.Admin,
      });

      await defaultRoles.save();
      return defaultRoles;
    } else {
      console.log(`${seederAdmin.Admin} role is already exists`);
    }
  } catch (err) {
    throw new Error(`Can NOT creat default roles - ${err}`);
  }
};

module.exports = {
  rolesSeeder,
  ...seederAdmin,
};
