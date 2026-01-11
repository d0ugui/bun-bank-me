import { prismaClient } from '../libs/db';

export class ListAssignorsUseCase {
	async execute() {
		const assignors = await prismaClient.assignor.findMany({
			orderBy: { name: 'asc' },
		});

		return assignors;
	}
}
