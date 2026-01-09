import { PostAssignorController } from '../application/controllers/PostAssignorController';
import { PostPayableController } from '../application/controllers/PostPayableController';
import { routeAdapter } from './adapters/routeAdapter';

const Routes = {
	'/integrations/assignor': {
		POST: routeAdapter(new PostAssignorController()),
	},
	'/integrations/payable': {
		POST: routeAdapter(new PostPayableController()),
	},
};

export { Routes };
