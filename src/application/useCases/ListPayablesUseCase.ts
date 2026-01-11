import { prismaClient } from '../libs/db';

export class ListPayablesUseCase {
	async execute() {
		const payables = await prismaClient.payable.findMany({
			orderBy: { emissionDate: 'desc' },
			include: {
				assignor: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		return payables;
	}
}
