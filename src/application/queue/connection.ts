import amqplib, { type Channel, type ChannelModel } from 'amqplib';

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

async function getConnection(): Promise<ChannelModel> {
	if (!connection) {
		const amqpURL = Bun.env.RABBITMQ_URL;
		connection = await amqplib.connect(amqpURL);

		connection.on('error', (err) => {
			console.error('RabbitMQ connection error:', err);
			connection = null;
			channel = null;
		});

		connection.on('close', () => {
			console.log('RabbitMQ connection closed');
			connection = null;
			channel = null;
		});
	}
	return connection;
}

async function getChannel(): Promise<Channel> {
	if (!channel) {
		const conn = await getConnection();
		channel = await conn.createChannel();

		channel.on('error', (err) => {
			console.error('RabbitMQ channel error:', err);
			channel = null;
		});

		channel.on('close', () => {
			channel = null;
		});
	}
	return channel;
}

async function closeConnection(): Promise<void> {
	if (channel) {
		await channel.close();
		channel = null;
	}

	if (connection) {
		await connection.close();
		connection = null;
	}
}

export { closeConnection, getChannel, getConnection };
