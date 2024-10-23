require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { authRouter, userRouter } = require('./routes/index.js');
require('./config/config.mongo.js');

const app = express();

const limitInBytes = 50 * 1024 * 1024 * 1024;

app.use(bodyParser.json({ limit: limitInBytes }));
app.use(bodyParser.urlencoded({ limit: limitInBytes, extended: true }));

app.get('/', (req, res) => {
	res.send('Hallo world!!!');
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

if (require.main === module) {
	app.listen(process.env.PORT, () => {
		console.log(`App is listening to port ${process.env.PORT}`);
	});
}

module.exports = app;
