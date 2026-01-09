import { prismaClient } from '../libs/db';

interface IInput {
	value: number;
}

export class CreatePayableUseCase {
	async execute({ value }: IInput) {
		await prismaClient.payable.create({
			data: {
				assignorId: 'ca6baae8-9d4b-4700-b0d4-a785eae29b31',
				value,
			},
		});
	}
}
