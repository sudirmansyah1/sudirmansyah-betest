const express = require('express');
const { Login } = require('../controllers/authController.js');

const Router = express.Router();

Router.post('/login', Login);

module.exports = Router;
