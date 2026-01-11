import { z } from 'zod';
import { AssignorNotFound } from '../errors/AssignorNotFound';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import { UpdateAssignorUseCase } from '../useCases/UpdateAssignorUseCase';

const paramsSchema = z.object({
	id: z.uuid(),
});

const bodySchema = z
	.object({
		document: z.string().min(11).max(11).optional(),
		phone: z.string().min(11).max(11).optional(),
		name: z.string().max(140).optional(),
	})
	.refine((data) => Object.values(data).some((v) => v !== undefined), {
		message: 'At least one field must be provided',
	});

export class UpdateAssignorController implements IController {
	async handle({ params, body }: IRequest): Promise<IResponse> {
		const updateAssignorUseCase = new UpdateAssignorUseCase();

		try {
			const { id } = paramsSchema.parse(params);
			const data = bodySchema.parse(body);

			await updateAssignorUseCase.execute(id, data);

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

			if (error instanceof AssignorNotFound) {
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
