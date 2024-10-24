const kafkaProducer = require('../../services/producer.kafka.js');
const Joi = require('joi');
const { successResponse, errorResponse } = require('../../utils/responseUtils.js');

const producer = new kafkaProducer();

module.exports = async (req, res) => {
	const { user_id } = req.params;

	const schema = Joi.object({
		user_id: Joi.number().required().messages({
			'any.required': 'User ID is required',
		}),
	});

	const { error } = schema.validate({ user_id });

	if (error) {
		return errorResponse(res, 400, error.details[0].message);
	}

	try {
		await producer.produce('user_delete', [
			{
				value: JSON.stringify({
					user_id
				}),
			},
		]);

		return successResponse(res, 'User delete successfully');
	} catch (errx) {
		console.log(errx);
		return errorResponse(res, 500, 'Internal Server Error');
	}
};
