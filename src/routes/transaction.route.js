// Route : /api/owner
import { Router } from 'express';
import { check } from 'express-validator';
import { transactionController } from './../controllers';
import { globalMiddleware, carMiddleware, transactionMiddleware } from './../middlewares';

const router = Router();

router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransaction);
router.post('/',
	[
		check('car', 'The Car is required').isMongoId(),
		check('oil', 'oil is not a boolean value').isBoolean(),
		check('filter', 'filter is not a boolean value').isBoolean(),
		check('strap', 'strap is not a boolean value').isBoolean(),
		check('general', 'general is not a boolean value').isBoolean(),
		check('paint', 'paint is not a boolean value').isBoolean(),
		check('other', 'other is not a boolean value').isBoolean(),
		globalMiddleware.validateFields,
		carMiddleware.checkExistCarById,
		transactionMiddleware.checkPaintCar
	],
	transactionController.createTransaction);

export default router;