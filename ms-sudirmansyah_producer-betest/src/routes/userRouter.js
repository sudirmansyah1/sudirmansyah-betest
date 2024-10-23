const express = require('express');
const {
	add,
	getAll,
	getByIdentityNumber,
	getByAccountNumber,
} = require('../controllers/userController/index.js');
const authenticateJWT = require('../middleware/authenticateJWTMiddleware.js');

const Router = express.Router();

Router.post('/', authenticateJWT, add);
Router.get('/all', authenticateJWT, getAll);
Router.get('/identity/:identityNumber', authenticateJWT, getByIdentityNumber);
Router.get('/account/:accountNumber', authenticateJWT, getByAccountNumber);

module.exports = Router;
