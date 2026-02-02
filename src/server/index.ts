import Elysia from 'elysia';

import { DeleteAssignorController } from '../application/controllers/DeleteAssignorController';
import { DeletePayableController } from '../application/controllers/DeletePayableController';
import { ListAssignorByIdController } from '../application/controllers/ListAssignorByIdController';
import { ListAssignorsController } from '../application/controllers/ListAssignorsController';
import { ListPayableByIdController } from '../application/controllers/ListPayableByIdController';
import { ListPayablesController } from '../application/controllers/ListPayablesController';
import { PostAssignorController } from '../application/controllers/PostAssignorController';
import { PostPayableController } from '../application/controllers/PostPayableController';
import { PostPayableBatchController } from '../application/controllers/PostPayablesBatchController';
import { SignInController } from '../application/controllers/SignInController';
import { SignUpController } from '../application/controllers/SignUpController';
import { UpdateAssignorController } from '../application/controllers/UpdateAssignorController';
import { authenticationMiddleware } from '../application/middleware/AuthenticationMiddleware';
import { closeConnection } from '../application/queue/connection';
import { startConsumer } from '../application/queue/consumer';
import { routeAdapter } from './adapters/routeAdapter';

const app = new Elysia()
	.post('/sign-up', routeAdapter(new SignUpController()))
	.post('/sign-in', routeAdapter(new SignInController()))
	.group('/integrations', (app) =>
		app
			.resolve((ctx) => authenticationMiddleware(ctx))
			.post('/assignor', routeAdapter(new PostAssignorController()))
			.get('/assignor', routeAdapter(new ListAssignorsController()))
			.get('/assignor/:id', routeAdapter(new ListAssignorByIdController()))
			.delete('/assignor/:id', routeAdapter(new DeleteAssignorController()))
			.patch('/assignor/:id', routeAdapter(new UpdateAssignorController()))
			.post('/payable', routeAdapter(new PostPayableController()))
			.post('/payable/batch', routeAdapter(new PostPayableBatchController()))
			.get('/payable', routeAdapter(new ListPayablesController()))
			.get('/payable/:id', routeAdapter(new ListPayableByIdController()))
			.delete('/payable/:id', routeAdapter(new DeletePayableController())),
	)
	.listen(3001);

console.log(`🦊 Server started at ${app.server?.hostname}:${app.server?.port}`);

startConsumer().catch((error) => {
	console.error('Error starting consumer:', error);
});

async function shutdownQueueConnection() {
	await closeConnection();
	process.exit(0);
}

process.on('SIGTERM', shutdownQueueConnection);
process.on('SIGINT', shutdownQueueConnection);
