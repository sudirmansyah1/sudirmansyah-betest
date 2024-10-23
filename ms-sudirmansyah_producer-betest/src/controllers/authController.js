const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/userModel.js');
const crypto = require('crypto');
const { successResponse, errorResponse } = require('../utils/responseUtils.js');

const Login = async (req, res) => {
	const { username, password } = req.body;

	const schema = Joi.object({
		username: Joi.string().required().min(3).max(30).messages({
			'string.base': 'username must be a string',
			'string.empty': 'username cannot be empty',
		}),
		password: Joi.string().required().min(8).max(255).messages({
			'string.base': 'password must be a string',
			'string.empty': 'password cannot be empty',
		}),
	});

	const { error } = schema.validate({ username, password });

	if (error) {
		return errorResponse(res, 400, error.details[0].message);
	}

	try {
		const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
		const user = await User.findOne({ userName: username, password: hashedPassword });

		if (!user) {
			return errorResponse(res, 401, 'Invalid username or password');
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		return successResponse(res, {
			token,
			expires: new Date(Date.now() + 3600000).toISOString(),
		});
	} catch (errx) {
		return errorResponse(res, 500, errx.message);
	}
};

module.exports = { Login };
