import { z } from 'zod';
import { AssignorAlreadyExists } from '../errors/AssignorAlreadyExists.ts';
import type { IController, IResponse } from '../interfaces/IController.ts';
import type { IRequest } from '../interfaces/IRequest.ts';
import { CreateAssignorUseCase } from '../useCases/CreateAssignorUseCase.ts';

const schema = z.object({
	document: z.string().min(11).max(11),
	email: z.email().min(1).max(140),
	phone: z.string().min(11).max(11),
	name: z.string().max(140),
});

export class PostAssignorController implements IController {
	async handle({ body }: IRequest): Promise<IResponse> {
		const createAssignor = new CreateAssignorUseCase();

		try {
			const { document, email, phone, name } = schema.parse(body);

			await createAssignor.execute({ document, email, phone, name });

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			if (error instanceof AssignorAlreadyExists) {
				return {
					statusCode: 409,
					body: {
						message: 'Assignor already exists',
					},
				};
			}

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
