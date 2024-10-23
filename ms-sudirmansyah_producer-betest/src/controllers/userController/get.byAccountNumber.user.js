const User = require('../../models/userModel.js');
const Joi = require('joi');
const { successResponse, errorResponse } = require('../../utils/responseUtils.js');

module.exports = async (req, res) => {
	const { accountNumber } = req.params;

	const schema = Joi.object({
		accountNumber: Joi.number().required().messages({
			'number.base': 'Account number must be a number',
			'number.empty': 'Account number is required',
			'number.required': 'Account number is required',
		}),
	});

	const { error } = schema.validate({ accountNumber });

	if (error) {
		return errorResponse(res, 400, error.details[0].message);
	}

	try {
		const user = await User.findOne({ accountNumber: accountNumber });
		if (!user) {
			return errorResponse(res, 404, 'User not found');
		}
		successResponse(res, user);
	} catch (errx) {
		console.log(errx);
		errorResponse(res, 500, errx.message);
	}
};
