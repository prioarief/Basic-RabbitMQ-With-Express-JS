const amqp = require("amqplib/callback_api");

const connection = async () => {
    return new Promise((resolve, reject) => [
        amqp.connect('amqp://localhost', (err, conn) => {
            if(err) reject(err)
            resolve(conn)
        })
    ])
}

const sendMsg = async (queue, msg) => {
    const conn = await connection()
    try {
        const ch = await conn.createChannel()
        ch.assertQueue(queue, {
            durable: false
        })
        ch.sendToQueue(queue, Buffer.from(msg))
        console.log('[x] Send Message : %s', msg);
    } catch (error) {
        console.log(error);
    }
}


sendMsg('test', 'Halo from promise')