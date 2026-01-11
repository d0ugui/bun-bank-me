import { z } from 'zod';
import { PayableNotFound } from '../errors/PayableNotFound';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import { DeletePayableUseCase } from '../useCases/DeletePayableUseCase';

const schema = z.object({
	id: z.uuid(),
});

export class DeletePayableController implements IController {
	async handle({ params }: IRequest): Promise<IResponse> {
		const deletePayableUseCase = new DeletePayableUseCase();

		try {
			const { id } = schema.parse(params);

			await deletePayableUseCase.execute(id);

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

			if (error instanceof PayableNotFound) {
				return {
					statusCode: 404,
					body: {
						message: 'Payable not found',
					},
				};
			}

			throw error;
		}
	}
}
