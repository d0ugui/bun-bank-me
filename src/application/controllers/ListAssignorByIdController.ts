import { z } from 'zod';
import { UserNotFound } from '../errors/UserNotFound';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import { ListAssignorByIdUseCase } from '../useCases/ListAssignorByIdUseCase';

const schema = z.object({
	id: z.uuid(),
});

export class ListAssignorByIdController implements IController {
	async handle({ params }: IRequest): Promise<IResponse> {
		const listAssignorByIdUseCase = new ListAssignorByIdUseCase();

		try {
			const { id } = schema.parse(params);

			const assignor = await listAssignorByIdUseCase.execute(id);

			return {
				statusCode: 200,
				body: assignor,
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
						message: 'User not found',
					},
				};
			}

			throw error;
		}
	}
}
