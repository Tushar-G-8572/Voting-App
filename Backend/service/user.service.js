const userModel = require('../models/user.model');

module.exports.createUser = async ({ username, email, password, role = 'User' }) => {
  if (!username || !email || !password) {
    throw new Error('All fields are required');
  }

  const user = new userModel({
    username,
    email,
    password,
    role
  });

  return await user.save();
};
