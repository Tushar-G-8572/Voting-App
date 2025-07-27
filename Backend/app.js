const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin.route');
const pollRoute = require('./routes/poll.route');
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
connectToDb();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',userRoute);
app.use('/admin',adminRoute);
app.use('/polls',pollRoute);

module.exports = app;