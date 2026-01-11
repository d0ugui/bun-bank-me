import { DeleteAssignorController } from '../application/controllers/DeleteAssignorController';
import { DeletePayableController } from '../application/controllers/DeletePayableController';
import { ListAssignorByIdController } from '../application/controllers/ListAssignorByIdController';
import { ListAssignorsController } from '../application/controllers/ListAssignorsController';
import { ListPayableByIdController } from '../application/controllers/ListPayableByIdController';
import { ListPayablesController } from '../application/controllers/ListPayablesController';
import { PostAssignorController } from '../application/controllers/PostAssignorController';
import { PostPayableController } from '../application/controllers/PostPayableController';
import { routeAdapter } from './adapters/routeAdapter';

const Routes = {
	'/integrations/assignor': {
		POST: routeAdapter(new PostAssignorController()),
		GET: routeAdapter(new ListAssignorsController()),
	},
	'/integrations/payable': {
		POST: routeAdapter(new PostPayableController()),
		GET: routeAdapter(new ListPayablesController()),
	},
	'/integrations/assignor/:id': {
		GET: routeAdapter(new ListAssignorByIdController()),
		DELETE: routeAdapter(new DeleteAssignorController()),
	},
	'/integrations/payable/:id': {
		GET: routeAdapter(new ListPayableByIdController()),
		DELETE: routeAdapter(new DeletePayableController()),
	},
};

export { Routes };
