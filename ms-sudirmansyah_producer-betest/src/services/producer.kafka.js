const kafka = require('../config/config.kafka.js');

class KafkaProducer {
	constructor() {
		this.producer = kafka.producer();
	}

	async produce(topic, messages) {
		try {
			await this.producer.connect();
			await this.producer.send({
				topic: topic,
				messages: messages,
			});
		} catch (error) {
			throw new Error(`Failed to produce message: ${error.message}`);
		} finally {
			await this.producer.disconnect();
		}
	}
}

module.exports = KafkaProducer;
