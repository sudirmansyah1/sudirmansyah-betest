const User = require('../../models/userModel.js');

module.exports = async (request) => {
	const { user_id } = request;

	try {
		await User.deleteOne({ id: user_id });
		return { success: true, message: 'User deleted successfully' };
	} catch (error) {
		console.log(error.message);
		return { success: false, message: 'Failed to create user' };
	}
};
