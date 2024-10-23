const kafkaProducer = require('../../services/producer.kafka.js');
const Joi = require('joi');
const crypto = require('crypto');
const { successResponse, errorResponse } = require('../../utils/responseUtils.js');

const producer = new kafkaProducer();

module.exports = async (req, res) => {
	const { username, emailaddress, password } = req.body;

	const schema = Joi.object({
		username: Joi.string().required().min(3).max(50).messages({
			'string.base': 'User name must be a string',
			'string.empty': 'User name is required',
			'string.min': 'User name must be at least 3 characters long',
			'string.max': 'User name must be at most 50 characters long',
		}),
		emailaddress: Joi.string().email().required().messages({
			'string.base': 'Email address must be a string',
			'string.empty': 'Email address is required',
			'string.email': 'Invalid email address',
		}),
		password: Joi.string().required().min(8).max(50).messages({
			'string.base': 'Password must be a string',
			'string.empty': 'Password is required',
			'string.min': 'Password must be at least 8 characters long',
			'string.max': 'Password must be at most 50 characters long',
		}),
	});

	const { error } = schema.validate({ username, emailaddress, password });

	if (error) {
		return errorResponse(res, 400, error.details[0].message);
	}

	try {
		const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
		const accountNumber = Math.floor(Math.random() * 1000000000);
		const identityNumber = crypto.randomUUID();

		await producer.produce('user_add', [
			{
				value: JSON.stringify({
					userName: username,
					emailAddress: emailaddress,
					password: hashedPassword,
					accountNumber,
					identityNumber,
				}),
			},
		]);

		return successResponse(res, 'User created successfully');
	} catch (errx) {
		console.log(errx);
		return errorResponse(res, 500, 'Internal Server Error');
	}
};
