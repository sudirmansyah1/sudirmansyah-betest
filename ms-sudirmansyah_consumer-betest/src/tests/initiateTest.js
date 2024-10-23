require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(async () => {
	await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 30000,
		bufferCommands: false,
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
