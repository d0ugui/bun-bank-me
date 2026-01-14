import { z } from 'zod';
import { InvalidCredentials } from '../errors/InvalidCrendentials';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import { SignInUseCase } from '../useCases/SignInUseCase';

const schema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export class SignInController implements IController {
	async handle({ body }: IRequest): Promise<IResponse> {
		const signInUseCase = new SignInUseCase();

		try {
			const { email, password } = schema.parse(body);

			const { accessToken } = await signInUseCase.execute({
				email,
				password,
			});

			return {
				statusCode: 200,
				body: {
					accessToken,
				},
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				return {
					statusCode: 400,
					body: error.issues,
				};
			}

			if (error instanceof InvalidCredentials) {
				return {
					statusCode: 401,
					body: {
						error: 'Invalid credentials',
					},
				};
			}

			throw error;
		}
	}
}
