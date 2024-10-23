const User = require('../../models/userModel.js');
const Joi = require('joi');
const { successResponse, errorResponse } = require('../../utils/responseUtils.js');

module.exports = async (req, res) => {
    const { identityNumber } = req.params;
    
    const schema = Joi.object({
        identityNumber: Joi.string().required().messages({
            'string.base': 'Identity number must be a string',
            'string.empty': 'Identity number is required',
            'any.required': 'Identity number is required'
        })
    });

    const { error } = schema.validate({ identityNumber });

    if (error) {
        return errorResponse(res, 400, error.details[0].message);
    }

    try {
        const user = await User.findOne({ identityNumber: identityNumber });
        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }
        successResponse(res, user);
    } catch (errx) {
        console.log(errx)
        errorResponse(res, 500, errx.message);
    }
}