import type { IController, IResponse } from '../interfaces/IController';
import { ListPayablesUseCase } from '../useCases/ListPayablesUseCase';

export class ListPayablesController implements IController {
	async handle(): Promise<IResponse> {
		const listPayablesUseCase = new ListPayablesUseCase();

		const payables = await listPayablesUseCase.execute();

		return {
			statusCode: 200,
			body: payables,
		};
	}
}
