import { prismaClient } from '../db/db';
import { AssignorAlreadyExists } from '../errors/AssignorAlreadyExists';

interface IInput {
	document: string;
	email: string;
	phone: string;
	name: string;
}

export class CreateAssignorUseCase {
	async execute({ document, email, phone, name }: IInput) {
		const accountAlreadyExists = await prismaClient.assignor.findUnique({
			where: {
				email,
			},
		});

		if (accountAlreadyExists) {
			throw new AssignorAlreadyExists();
		}

		await prismaClient.assignor.create({
			data: {
				document,
				email,
				phone,
				name,
			},
		});
	}
}
