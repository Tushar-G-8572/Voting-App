const { validationResult } = require('express-validator');
const adminModel = require('../models/admin.model');
const adminService = require('../service/admin.service');
const pollService = require('../service/poll.service');

module.exports.registerAdmin = async (req, res, next) => {
  try {
    console.log("responce data is ", res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { username, email, password } = req.body;
    const isAdminAlready = await adminModel.findOne({ email });
    if (isAdminAlready) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const hashedPassword = await adminModel.hashPassword(password);

    const admin = await adminService.createAdmin({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    const token = admin.generateAuthToken();
    res.cookie("token",token);
    res.status(201).json({ token, admin });
  } catch (error) {
    next(error);
  }
};

module.exports.loginAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = admin.generateAuthToken();
    res.cookie('token', token, { httpOnly: true,
                                  secure: false, });

    res.status(200).json({ token, admin });
  } catch (error) {
    next(error);
  }
};

module.exports.getAdminProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports.logoutAdmin = async (req, res, next) => {
  try {
    res.cookie('token',"");
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.createPoll = async (req,res)=>{
  try{
    const adminId = req.user.id;
    const result = await pollService.createPoll(req.body,adminId);
    res.status(200).json(result);
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}
module.exports.editPoll = async(req,res)=>{
  try{
    const pollId = req.params.id;
    const result = await pollService.editPoll(pollId,req.body);
    console.log(result);
    res.status(200).json(result);
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}

module.exports.deletePoll = async(req,res)=>{
  try{
    const pollId = req.params.id;
    await pollService.deletePoll(pollId);
    res.status(200).json({message:'poll deleted Successfully'})
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}

module.exports.getPollResult = async(req,res)=>{
  try{
    const pollId = req.params.id;
    const result = await pollService.getPollResults(pollId);
    res.status(200).json(result);

  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}