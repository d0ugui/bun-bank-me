import type { Context } from 'elysia';
import { type JwtPayload, verify } from 'jsonwebtoken';

export function authenticationMiddleware(ctx: Context) {
	const { authorization } = ctx.headers;

	try {
		if (!authorization) {
			throw new Error();
		}

		const [bearer, token] = authorization.split(' ');

		if (bearer !== 'Bearer' || !token) {
			throw new Error();
		}

		const { sub, role } = verify(token, Bun.env.JWT_SECRET) as JwtPayload;

		return { sub, role };
	} catch {
		return ctx.status(401, { error: 'Invalid access token.' });
	}
}
