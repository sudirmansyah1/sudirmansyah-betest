const express = require('express');
const {
	add,
	update,
	deleteUser,
	getAll,
	getByIdentityNumber,
	getByAccountNumber,
} = require('../controllers/userController/index.js');
const authenticateJWT = require('../middleware/authenticateJWTMiddleware.js');

const Router = express.Router();

Router.post('/', add);
Router.put('/:user_id', authenticateJWT, update);
Router.delete('/:user_id', authenticateJWT, deleteUser);
Router.get('/all', authenticateJWT, getAll);
Router.get('/identity/:identityNumber', authenticateJWT, getByIdentityNumber);
Router.get('/account/:accountNumber', authenticateJWT, getByAccountNumber);

module.exports = Router;
