const ampq = require("amqplib/callback_api");

ampq.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, channel) => {
    if (err) throw err;
    const queque = 'Greeting'
    channel.assertQueue(queque, {
        durable: false
    })
    console.log('[*]  Waiting for messages in %s. To exit press ctrl+c', queque);
    channel.consume(queque, (msg) => {
        console.log(" [x] Received %s", msg.content.toString());
    })
  });
});
