import { AssignorController } from '../application/controllers/AssignorController';
import { routeAdapter } from './adapters/routeAdapter';

const Routes = {
	'/integrations/assignor': {
		POST: routeAdapter(new AssignorController()),
	},
};

export { Routes };
