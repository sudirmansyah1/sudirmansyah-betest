const mongoose = require('mongoose');

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 30000,
		bufferCommands: false,
	})
	.then(() => {
		console.log('MongoDB connected successfully');
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
	});
