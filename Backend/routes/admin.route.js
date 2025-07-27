const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controller/admin.controller');
const { authenticate } = require('../middleware/auth');
const isAdmin = require('../middleware/role');

const route = express.Router();

route.post('/register', [
  body('email').isEmail(),
  body('username').isLength({ min: 3 }),
  body('password').isLength({ min: 6 })
], adminController.registerAdmin);

route.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], adminController.loginAdmin);

route.get('/profile',authenticate, adminController.getAdminProfile);
route.get('/logout', adminController.logoutAdmin);

route.post('/create-poll',authenticate,isAdmin,adminController.createPoll);
route.put('/edit-poll/:id',authenticate,isAdmin,adminController.editPoll);
route.delete('/delete-poll/:id',authenticate,isAdmin,adminController.deletePoll);
route.get('/poll-results/:id',authenticate,isAdmin,adminController.getPollResult);

module.exports = route;
