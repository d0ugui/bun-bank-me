import type { IPayable } from '../interfaces/IPayable';
import { getChannel } from './connection';

async function publishToQueue(messages: IPayable[]) {
	const queue = Bun.env.RABBITMQ_QUEUE_NAME;

	try {
		const channel = await getChannel();
		await channel.assertQueue(queue, { durable: false });

		for (const payable of messages) {
			channel.sendToQueue(queue, Buffer.from(JSON.stringify(payable)));
			console.log(`[x] Sent "${JSON.stringify(payable)}" to "${queue}"`);
		}
	} catch (error) {
		console.error('Error in producer:', error);
		throw error;
	}
}

export { publishToQueue };
