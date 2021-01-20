const amqp = require("amqplib/callback_api");

const connection = async () => {
    return new Promise((resolve, reject) => [
        amqp.connect('amqp://localhost', (err, conn) => {
            if(err) reject(err)
            resolve(conn)
        })
    ])
}

const receiveMsg = async (queue) => {
    const conn = await connection()
    try {
        const ch = await conn.createChannel()
        ch.assertQueue(queue, {
            durable: false
        })
        console.log('[*]  Waiting for messages in %s. To exit press ctrl+c', queue);
        ch.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        })
    } catch (error) {
        console.log(error);
    }
}


receiveMsg('test')