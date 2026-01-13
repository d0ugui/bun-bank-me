import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prismaClient } from '../libs/db';

interface IInput {
	name: string;
	email: string;
	password: string;
}

type IOutput = void;

export class SignUpUseCase {
	async execute({ name, email, password }: IInput): Promise<IOutput> {
		const salt = 5;

		const accountAlreadyExists = await prismaClient.account.findUnique({
			where: { email },
		});

		if (accountAlreadyExists) {
			throw new AccountAlreadyExists();
		}

		const hashedPassword = await Bun.password.hash(password, {
			algorithm: 'bcrypt',
			cost: salt,
		});

		await prismaClient.account.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: 'USER',
			},
		});
	}
}
