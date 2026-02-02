import type { IPayable } from '../interfaces/IPayable';
import { publishToQueue } from '../queue/producer';

export class PublishPayableOnQueueUseCase {
	async execute(payables: IPayable[]) {
		await publishToQueue(payables);
	}
}
