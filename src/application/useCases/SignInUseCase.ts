import { sign } from 'jsonwebtoken';
import { InvalidCredentials } from '../errors/InvalidCrendentials';
import { prismaClient } from '../libs/db';

interface IInput {
	email: string;
	password: string;
}
interface IOutput {
	accessToken: string;
}

export class SignInUseCase {
	async execute({ email, password }: IInput): Promise<IOutput> {
		const account = await prismaClient.account.findUnique({
			where: { email },
		});

		if (!account) {
			throw new InvalidCredentials();
		}

		const isPasswordValid = await Bun.password.verify(
			password,
			account.password,
		);

		if (!isPasswordValid) {
			throw new InvalidCredentials();
		}

		const accessToken = sign(
			{ sub: account.id, role: account.role },
			Bun.env.JWT_SECRET,
			{ expiresIn: '1m' },
		);

		return {
			accessToken,
		};
	}
}
