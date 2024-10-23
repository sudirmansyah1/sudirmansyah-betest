require('dotenv').config();
const KafkaConsumer = require("./services/consumer.kafka.js");
require('./config/config.mongo.js');
const { add } = require('./controllers/User/index.js');

const kafkaConsumer = new KafkaConsumer('USERADD');
kafkaConsumer.consume('user_add', async (topic, partition, value) => {
	const request = JSON.parse(value);
	const response = await add(request);
	console.log(response);
});
