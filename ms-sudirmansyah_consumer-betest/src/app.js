require('dotenv').config();
const KafkaConsumer = require('./services/consumer.kafka.js');
require('./config/config.mongo.js');
const { add, update, remove } = require('./controllers/User/index.js');

const kafkaConsumerAdd = new KafkaConsumer('USERADD'); // Consumer for user_add
const kafkaConsumerUpdate = new KafkaConsumer('USERUPDATE'); // Consumer for user_update
const kafkaConsumerDelete = new KafkaConsumer('USERDELETE'); // Consumer for user_delete

kafkaConsumerAdd.consume('user_add', async (topic, partition, value) => {
	const request = JSON.parse(value);
	console.log("user_add request:", request);
	const response = await add(request);
	console.log("user_add response:", response);
});

kafkaConsumerUpdate.consume('user_update', async (topic, partition, value) => {
	const request = JSON.parse(value);
	console.log("user_update request:", request);
	const response = await update(request);
	console.log("user_update response:", response);
});

kafkaConsumerDelete.consume('user_delete', async (topic, partition, value) => {
	const request = JSON.parse(value);
	console.log("user_remove request:", request);
	const response = await remove(request);
	console.log("user_remove response:", response);
});

