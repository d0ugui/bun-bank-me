import type { IController, IResponse } from '../interfaces/IController';
import { ListAssignorsUseCase } from '../useCases/ListAssignorsUseCase';

export class ListAssignorsController implements IController {
	async handle(): Promise<IResponse> {
		const listAssignorsUseCase = new ListAssignorsUseCase();

		const assignors = await listAssignorsUseCase.execute();

		return {
			statusCode: 200,
			body: assignors,
		};
	}
}
