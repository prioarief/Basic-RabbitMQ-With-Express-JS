const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, channel) => {
    if (err) throw err;
    const queque = "Greeting";
    const msg = "Hello World 1";

    channel.assertQueue(queque, {
        durable: false
    })
    channel.sendToQueue(queque, Buffer.from(msg))
    console.log(' [x] Sents %s', msg);
  });
});
