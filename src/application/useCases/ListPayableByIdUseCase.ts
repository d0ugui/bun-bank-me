import { PayableNotFound } from '../errors/PayableNotFound';
import { prismaClient } from '../libs/db';

export class ListPayableByIdeUseCase {
	async execute(id: string) {
		const assignor = await prismaClient.payable.findUnique({
			where: {
				id,
			},
		});

		if (!assignor) {
			throw new PayableNotFound();
		}

		return assignor;
	}
}
