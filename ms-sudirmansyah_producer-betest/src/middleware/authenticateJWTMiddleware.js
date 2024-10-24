const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { errorResponse } = require('../utils/responseUtils.js');
const authenticateJWT = (req, res, next) => {
	const token = req.header('Authorization');
	if (!token || !token.startsWith('Bearer '))
		return errorResponse(res, 401, 'Access denied. No token provided.');

	try {
		const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
		req.user = decoded;
		next();
	} catch (ex) {
		console.log(ex.message);
		return errorResponse(res, 401, 'Invalid token');
	}
};

module.exports = authenticateJWT;
