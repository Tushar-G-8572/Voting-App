const Admin = require('../models/admin.model');

module.exports.createAdmin = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
};
