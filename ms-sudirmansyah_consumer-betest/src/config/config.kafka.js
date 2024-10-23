const { Kafka } = require('kafkajs');
const { KAFKA_BROKER, KAFKA_CLIENT_ID } = process.env;

const kafkaConfig = {
	clientId: KAFKA_CLIENT_ID,
	brokers: [KAFKA_BROKER],
};

const kafka = new Kafka(kafkaConfig);

module.exports = kafka;
