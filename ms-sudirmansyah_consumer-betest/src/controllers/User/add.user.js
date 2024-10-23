const User = require('../../models/userModel.js');

module.exports = async (request) => {
	const { userName, emailAddress, password, accountNumber, identityNumber } = request;

	try {
		const user = new User({
			userName,
			emailAddress,
			password,
			accountNumber,
			identityNumber,
		});

		await user.save();
		return { success: true, message: user };
	} catch (error) {
		console.log(error);
		return { success: false, message: 'Failed to create user' };
	}
};
