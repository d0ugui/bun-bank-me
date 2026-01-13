import { z } from 'zod';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import { SignUpUseCase } from '../useCases/SignUpUseCase';

const schema = z.object({
	name: z.string().min(2),
	email: z.email(),
	password: z.string().min(8),
});

export class SignUpController implements IController {
	async handle({ body }: IRequest): Promise<IResponse> {
		const signUpUseCase = new SignUpUseCase();

		try {
			const { name, email, password } = schema.parse(body);

			await signUpUseCase.execute({ name, email, password });

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				return {
					statusCode: 400,
					body: error.issues,
				};
			}

			if (error instanceof AccountAlreadyExists) {
				return {
					statusCode: 409,
					body: {
						error: 'This email is already in use',
					},
				};
			}

			throw error;
		}
	}
}
