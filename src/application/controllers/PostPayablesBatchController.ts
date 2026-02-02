import { z } from 'zod';
import type { IController, IResponse } from '../interfaces/IController.ts';
import type { IRequest } from '../interfaces/IRequest.ts';
import { PublishPayableOnQueueUseCase } from '../useCases/PublishPayablesOnQueueUseCase.ts';

const schema = z.object({
	payables: z.array(
		z.object({
			value: z.number().min(0),
			assignorId: z.string(),
		}),
	),
});

export class PostPayableBatchController implements IController {
	async handle({ body }: IRequest): Promise<IResponse> {
		const publishPayable = new PublishPayableOnQueueUseCase();

		try {
			const { payables } = schema.parse(body);

			publishPayable.execute(payables);

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				return {
					statusCode: 400,
					body: {
						message: error.issues,
					},
				};
			}

			throw error;
		}
	}
}
