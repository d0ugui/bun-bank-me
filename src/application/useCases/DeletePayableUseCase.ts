import { PayableNotFound } from '../errors/PayableNotFound';
import { prismaClient } from '../libs/db';

export class DeletePayableUseCase {
	async execute(id: string) {
		const payable = await prismaClient.payable.findUnique({
			where: { id },
		});

		if (!payable) {
			throw new PayableNotFound();
		}

		await prismaClient.payable.delete({
			where: { id },
		});
	}
}
