const express = require('express');
const { loginUser } = require('../controllers/login');
const app = express();

app.post('/login', loginUser)

module.exports = app