const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const adminModel = require('../models/admin.model');
const pollModel = require('../models/poll.model'); 

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    // console.log('Cookies:', req.cookies);
    // console.log('Authorization Header:', req.header('Authorization'));
    // console.log('Token:', token);
    // console.log("Authorised token", token)
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded",decoded);
    let user;
    if (decoded.role === 'admin') {
      user = await adminModel.findById(decoded._id).select('-password');
    } else {
      user = await userModel.findById(decoded._id).select('-password');
    }
    // console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user; // Store user/admin in req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

const requireUser = (req, res, next) => {
  if (!req.user || req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied. User role required.' });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
  next();
};

const isVoted = async (req, res, next) => {
  try {
    const { pollId } = req.params; 
    const userId = req.user._id;   

    if (!pollId || !userId) {
      return res.status(400).json({ error: "Missing pollId or userId" });
    }

    const poll = await pollModel.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const hasVoted = poll.voters.some(voter => voter.toString() === userId.toString());

    if (hasVoted) {
      return res.status(403).json({ error: "You have already voted in this poll" });
    }

    next();
  } catch (error) {
    console.error("isVoted middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  authenticate,
  requireUser,
  requireAdmin,
};
