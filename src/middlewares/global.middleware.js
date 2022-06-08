import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

export const validateFields = (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) return res.status(400).json({ ok : false, errors : errors.mapped() });
	next();
}

export const validateMongooseObjectId = (req, res, next) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ ok : false, msg : 'The id param is not objectID valid' }); // Valid objectId
	next();
}