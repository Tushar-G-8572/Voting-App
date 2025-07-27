const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin'], 
    default: 'admin'
  },
  pollsCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

adminSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    role: this.role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
