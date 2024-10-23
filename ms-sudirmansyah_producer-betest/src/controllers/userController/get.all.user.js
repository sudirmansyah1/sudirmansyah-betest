const User = require('../../models/userModel.js');
const { successResponse, errorResponse } = require('../../utils/responseUtils.js');

module.exports = async (req, res) => {
    try {
        const users = await User.find();
        successResponse(res, users);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}