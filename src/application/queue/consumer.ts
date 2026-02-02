import { CreatePayableUseCase } from '../useCases/CreatePayableUseCase';
import { getChannel } from './connection';

type Payable = {
	value: number;
	assignorId: string;
};

const MAX_RETRIES = 4;

async function startConsumer() {
	const queue = Bun.env.RABBITMQ_QUEUE_NAME;
	const deadLetterQueue = `${queue}-dlq`;

	try {
		const channel = await getChannel();

		await channel.assertQueue(deadLetterQueue, { durable: true });
		await channel.assertQueue(queue, { durable: false });

		console.log(`[*] Waiting for messages in "${queue}"`);

		const createPayableUseCase = new CreatePayableUseCase();

		await channel.consume(queue, async (msg) => {
			if (msg) {
				const payable = JSON.parse(msg.content.toString()) as Payable;
				const retryCount = (msg.properties.headers?.['x-retry-count'] as number) || 0;

				console.log(`[x] Received: ${JSON.stringify(payable)} (attempt ${retryCount + 1})`);

				try {
					await createPayableUseCase.execute(payable);
					console.log(`[✓] Payable created for assignor: ${payable.assignorId}`);
					channel.ack(msg);
				} catch (error) {
					console.error('Error processing message:', error);

					channel.ack(msg);

					if (retryCount + 1 >= MAX_RETRIES) {
						console.log(`[✗] Max retries reached. Moving to dead letter queue: ${deadLetterQueue}`);
						channel.sendToQueue(
							deadLetterQueue,
							Buffer.from(JSON.stringify(payable)),
							{
								persistent: true,
								headers: {
									'x-retry-count': retryCount + 1,
									'x-original-queue': queue,
									'x-error': error instanceof Error ? error.message : 'Unknown error',
								},
							},
						);
					} else {
						console.log(`[↻] Retrying message (attempt ${retryCount + 2} of ${MAX_RETRIES})`);
						channel.sendToQueue(
							queue,
							Buffer.from(JSON.stringify(payable)),
							{
								headers: {
									'x-retry-count': retryCount + 1,
								},
							},
						);
					}
				}
			}
		});
	} catch (error) {
		console.error('Error in consumer:', error);
		throw error;
	}
}

export { startConsumer };
