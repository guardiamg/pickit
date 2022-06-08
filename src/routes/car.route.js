// Route : /api/car
import { Router } from 'express';
import { check } from 'express-validator';
import { carController } from './../controllers';
import { globalMiddleware, carMiddleware } from './../middlewares';

const router = Router();

router.get('/', carController.getCars);

router.get('/:id', globalMiddleware.validateMongooseObjectId, carController.getCar);

router.post('/', 
	[
		check('brand', 'The Brand is required').not().isEmpty(),
		check('model', 'The Model is required').not().isEmpty(),
		check('year', 'The Year must be numeric').isNumeric(),
		check('patent', 'The Patent is required').not().isEmpty(),
		check('color', 'The Color is required').not().isEmpty(),
		check('owner', 'The Owner is required').isMongoId(),
		globalMiddleware.validateFields,
		carMiddleware.checkExistCarByPatent,
		carMiddleware.checkExistOwnerById
	],
	carController.createCar
);

router.put('/:id',
	[
		globalMiddleware.validateMongooseObjectId,
		carMiddleware.checkExistCarById,
		check('brand', 'The Brand is required').not().isEmpty(),
		check('model', 'The Model is required').not().isEmpty(),
		check('year', 'The Year is required').not().isEmpty(),
		check('patent', 'The Patent is required').not().isEmpty(),
		check('color', 'The Color is required').not().isEmpty(),
		globalMiddleware.validateFields,
	],
	carController.updateCar
);

router.delete('/:id',
	[
		globalMiddleware.validateMongooseObjectId,
		carMiddleware.checkExistCarById,
	],
	carController.deleteCar
);

export default router;