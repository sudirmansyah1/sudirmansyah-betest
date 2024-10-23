const successResponse = (res, message) => {
	res.status(200).json({
		is_error: false,
		status: 200,
		message: message,
	});
};

const errorResponse = (res, code, message) => {
	res.status(code).json({
		is_error: true,
		status: code,
		message: message,
	});
};

module.exports = { successResponse, errorResponse };
