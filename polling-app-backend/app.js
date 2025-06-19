const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/polls', require('./routes/polls'));
app.use('/api/polls', require('./routes/votes'));

module.exports = app;



