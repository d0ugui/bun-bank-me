import type { Context } from 'elysia';
import type { IController } from '../../application/interfaces/IController';

export function routeAdapter(controller: IController) {
	return async (ctx: Context) => {
		const { statusCode, body } = await controller.handle({
			params: ctx.params,
			body: ctx.body,
			headers: Object.fromEntries(ctx.request.headers.entries()),
		});

		return ctx.status(statusCode, body);
	};
}
