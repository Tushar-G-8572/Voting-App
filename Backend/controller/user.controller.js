const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../service/user.service');
const pollService = require('../service/poll.service');
const adminModel = require('../models/admin.model');

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create the user via the service
    const user = await userService.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // Generate auth token
    const token = user.generateAuthToken();
    res.cookie("token",token);
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  console.log(" in user login")
  try {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    console.log("In user controller")
    // Find user by email
    const newUser = await userModel.findOne({ email }).select('+password');
    if (!newUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(newUser);
    // Compare password
    const isMatch = await newUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token and set as cookie
    const token = newUser.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token, user: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.getOpenPolls = async(req,res)=>{
  try{
    const polls = await  pollService.getOpenPolls();
    res.json(polls);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

module.exports.voteInPolls = async(req,res)=>{
  try{
    const userId = req.user.id;
    const pollId = req.params.pollId;
    const optionIndex = req.body.optionIndex;

    const result = await pollService.votePoll(pollId,userId,optionIndex);
    res.json(result);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

module.exports.viewPollResult = async(req,res)=>{
  try{
    const userId = req.user.id;
    const pollId = req.params.pollId;

    const result = await pollService.viewResult(pollId,userId);
    res.json(result);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

module.exports.viewRole = async(req,res)=>{
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    const userData = userRole === 'admin'
      ? await adminModel.findById(userId).select('-password')
      : await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ role: userRole, ...userData._doc });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}