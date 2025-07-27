const express = require('express');
const { body } = require('express-validator');
const userController = require('../controller/user.controller');
const { authenticate } = require('../middleware/auth');
const route = express.Router();

// Register route
route.post('/register',
   [
  body('email').isEmail().withMessage('Invalid email'),
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
],
 userController.registerUser);

// Login route
route.post('/login',
   [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
],
 userController.loginUser);

route.get('/profile',authenticate, userController.getUserProfile);

// Logout
route.get('/logout', userController.logoutUser);

route.get('/polls',authenticate,userController.getOpenPolls);
route.post('/vote/:pollId',authenticate,userController.voteInPolls);
route.get('/view-result/:pollId',authenticate,userController.viewPollResult);
route.get('/me',authenticate,userController.viewRole);

module.exports = route;
