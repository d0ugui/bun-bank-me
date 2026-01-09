import { z } from 'zod';
import type { IController, IResponse } from '../interfaces/IController.ts';
import type { IRequest } from '../interfaces/IRequest.ts';
import { CreatePayableUseCase } from '../useCases/CreatePayableUseCase.ts';

const schema = z.object({
	value: z.number().min(0),
});

export class PostPayableController implements IController {
	async handle({ body }: IRequest): Promise<IResponse> {
		const createPayable = new CreatePayableUseCase();

		try {
			const { value } = schema.parse(body);

			await createPayable.execute({ value });

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
