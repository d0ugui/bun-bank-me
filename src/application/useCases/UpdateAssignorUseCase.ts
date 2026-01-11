import { AssignorNotFound } from '../errors/AssignorNotFound';
import { prismaClient } from '../libs/db';

interface UpdateAssignorData {
	document?: string;
	phone?: string;
	name?: string;
}

export class UpdateAssignorUseCase {
	async execute(id: string, data: UpdateAssignorData) {
		const assignor = await prismaClient.assignor.findUnique({
			where: { id },
		});

		if (!assignor) {
			throw new AssignorNotFound();
		}

		await prismaClient.assignor.update({
			where: { id },
			data,
		});
	}
}
