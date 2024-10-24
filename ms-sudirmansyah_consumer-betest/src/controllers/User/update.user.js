const User = require('../../models/userModel.js');

module.exports = async (request) => {
	const { user_id, userName, emailAddress, password } = request;

	try {
		const updatedUser = await User.updateOne(
			{ id: user_id },
			{
				$set: {
					userName: userName !== null ? userName : undefined,
					emailAddress: emailAddress !== null ? emailAddress : undefined,
					password: password !== null ? password : undefined,
				},
			}
		);

		return { success: true, message: updatedUser };
	} catch (error) {
		console.log(error.message);
		return { success: false, message: 'Failed to create user' };
	}
};
