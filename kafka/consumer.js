const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'microservice', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'group-id' });

const consumeMessages = async (topic, handler) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      handler(message.value.toString());
    }
  });
};

module.exports = { consumeMessages };
