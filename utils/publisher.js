//Dependencies
import { AMQPClient } from '@cloudamqp/amqp-client'
import {} from 'dotenv/config'

export default async function startPublisher(routingKey, email, subject, body) {
  try {
    //Setup a connection to the RabbitMQ server
    const cloudAMQPURL = process.env.CLOUDAMQP_URL
    const connection = new AMQPClient(cloudAMQPURL)
    await connection.connect()
    const channel = await connection.channel()

    console.log("[✅] Connection over channel established")

    //Declare the exchange and queue, and create a binding between them
    await channel.exchangeDeclare('email', 'direct')
    const q = await channel.queue('email.otp')
    await channel.queueBind('email.otp', 'email', 'otp')

    //Publish a message to the exchange
    async function sendToQueue(routingKey, email, subjec, body) {
      const message = { email, subject, body }
      const jsonMessage = JSON.stringify(message);

        //amqp-client function expects: publish(exchange, routingKey, message, options)
        await q.publish(jsonMessage, { routingKey })
        console.log("[📥] Message sent to queue", message)
    }

    //Send some messages to the queue
    sendToQueue(routingKey, email, subject, body);

    setTimeout(() => {
      //Close the connection
      connection.close()
      console.log("[❎] Connection closed")
      process.exit(0)
    }, 500);
  } catch (error) {
    console.error(error)

    //Retry after 3 second
    setTimeout(() => {
      startPublisher()
    }, 3000)
  }
}
