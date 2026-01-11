import { z } from 'zod';
import { UserNotFound } from '../errors/UserNotFound';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import { DeleteAssignorUseCase } from '../useCases/DeleteAssignorUseCase';

const schema = z.object({
	id: z.uuid(),
});

export class DeleteAssignorController implements IController {
	async handle({ params }: IRequest): Promise<IResponse> {
		const deleteAssignorUseCase = new DeleteAssignorUseCase();

		try {
			const { id } = schema.parse(params);

			await deleteAssignorUseCase.execute(id);

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

			if (error instanceof UserNotFound) {
				return {
					statusCode: 404,
					body: {
						message: 'Assignor not found',
					},
				};
			}

			throw error;
		}
	}
}
