const kafkaProducer = require('../../services/producer.kafka.js');
const Joi = require('joi');
const { successResponse, errorResponse } = require('../../utils/responseUtils.js');

const producer = new kafkaProducer();

module.exports = async (req, res) => {
	const { user_id } = req.params;
	const { username, emailaddress, password } = req.body;

	const schema = Joi.object({
		user_id: Joi.number().required().messages({
			'any.required': 'User ID is required',
		}),
		username: Joi.string().optional().messages({
			'string.base': 'User name must be a string',
		}),
		emailaddress: Joi.string().email().optional().messages({
			'string.base': 'Email address must be a string',
			'string.email': 'Invalid email address',
		}),
		password: Joi.string().optional(50).messages({
			'string.base': 'Password must be a string',
		}),
	});

	const { error } = schema.validate({ user_id, username, emailaddress, password });

	if (error) {
		return errorResponse(res, 400, error.details[0].message);
	}

	try {
		await producer.produce(`${process.env.KAFKA_TOPIC_PREFIX}user_update`, [
			{
				value: JSON.stringify({
					user_id,
					userName: username,
					emailAddress: emailaddress,
					password: password,
				}),
			},
		]);

		return successResponse(res, 'User update successfully');
	} catch (errx) {
		console.log(errx);
		return errorResponse(res, 500, 'Internal Server Error');
	}
};
