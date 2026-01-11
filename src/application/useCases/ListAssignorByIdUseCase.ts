import { AssignorNotFound } from '../errors/AssignorNotFound';
import { prismaClient } from '../libs/db';

export class ListAssignorByIdUseCase {
	async execute(id: string) {
		const assignor = await prismaClient.assignor.findUnique({
			where: {
				id,
			},
		});

		if (!assignor) {
			throw new AssignorNotFound();
		}

		return assignor;
	}
}
