import type { BunRequest } from 'bun';
import type { IController } from '../../application/interfaces/IController';

export function routeAdapter(controller: IController) {
	return async (req: BunRequest) => {
		const url = new URL(req.url);
		const query = Object.fromEntries(url.searchParams.entries());

		const { statusCode, body } = await controller.handle({
			params: req.params,
			body: await req.body?.json(),
			headers: Object.fromEntries(req.headers.entries()),
			query,
		});

		return new Response(JSON.stringify(body), { status: statusCode });
	};
}
