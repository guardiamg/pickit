// Route : /api/owner
import { Router } from 'express';
import { check } from 'express-validator';
import { ownerController } from './../controllers';
import { globalMiddleware, ownerMiddleware } from './../middlewares';

const router = Router();

router.get('/', ownerController.getOwners);

router.get('/:id', globalMiddleware.validateMongooseObjectId , ownerController.getOwner);

router.post('/',
	[
		check('name', 'The Name is required').not().isEmpty(),
		check('lastName', 'The Last Name is required').not().isEmpty(),
		check('dni', 'The DNI is required').not().isEmpty(),
		globalMiddleware.validateFields,
		ownerMiddleware.checkExistOwnerByDni
	],
	ownerController.createOwner
);

router.put('/:id',
	[
		globalMiddleware.validateMongooseObjectId,		
		ownerMiddleware.checkExistOwnerById,		
		check('name', 'The Name is required').not().isEmpty(),
		check('lastName', 'The Last Name is required').not().isEmpty(),
		globalMiddleware.validateFields
	],
	ownerController.updateOwner
);

router.delete('/:id',
	[
		globalMiddleware.validateMongooseObjectId,
		ownerMiddleware.checkExistOwnerById,
	],
	ownerController.deleteOwner
);

export default router;