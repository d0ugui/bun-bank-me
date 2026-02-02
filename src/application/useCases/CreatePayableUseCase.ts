import { prismaClient } from '../libs/db';

interface IInput {
	value: number;
	assignorId: string;
}

export class CreatePayableUseCase {
	async execute({ value, assignorId }: IInput) {
		await prismaClient.payable.create({
			data: {
				assignorId,
				value,
			},
		});
	}
}
