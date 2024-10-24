const { Kafka } = require('kafkajs');
const fs = require('fs');
const { KAFKA_BROKER, KAFKA_CLIENT_ID, KAFKA_CACERT_PATH, KAFKA_CERT_PATH, KAFKA_KEY_PATH } = process.env;

const kafkaConfig = {
	clientId: KAFKA_CLIENT_ID,
	brokers: [KAFKA_BROKER],
	ssl: {
	  rejectUnauthorized: true,
	  ca: [fs.readFileSync(KAFKA_CACERT_PATH, 'utf-8')],
	  key: fs.readFileSync(KAFKA_KEY_PATH, 'utf-8'),
	  cert: fs.readFileSync(KAFKA_CERT_PATH, 'utf-8')
	}
  };

const kafka = new Kafka(kafkaConfig);

module.exports = kafka;
