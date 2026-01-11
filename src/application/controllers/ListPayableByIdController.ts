import { z } from 'zod';
import { PayableNotFound } from '../errors/PayableNotFound';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import { ListPayableByIdeUseCase } from '../useCases/ListPayableByIdUseCase';

const schema = z.object({
	id: z.uuid(),
});

export class ListPayableByIdController implements IController {
	async handle({ params }: IRequest): Promise<IResponse> {
		const listPayableByIdUseCase = new ListPayableByIdeUseCase();

		try {
			const { id } = schema.parse(params);

			const payable = await listPayableByIdUseCase.execute(id);

			return {
				statusCode: 200,
				body: payable,
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

			if (error instanceof PayableNotFound) {
				return {
					statusCode: 404,
					body: {
						message: 'Payable Not Found',
					},
				};
			}

			throw error;
		}
	}
}
