import { z } from 'zod';
import type { IController, IResponse } from '../interfaces/IController.ts';
import type { IRequest } from '../interfaces/IRequest.ts';
import { CreatePayableUseCase } from '../useCases/CreatePayableUseCase.ts';

const schema = z.object({
	value: z.number().min(0),
	assignorId: z.string(),
});

export class PostPayableController implements IController {
	async handle({ body }: IRequest): Promise<IResponse> {
		const createPayable = new CreatePayableUseCase();

		try {
			const { value, assignorId } = schema.parse(body);

			await createPayable.execute({ value, assignorId });

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
