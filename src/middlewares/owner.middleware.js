import mongoose from 'mongoose';
import Owner from './../models/owner.model';

export const checkExistOwnerById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const ownerFound = await Owner.findById(id);
		if (!ownerFound) return res.status(404).json({ ok : false, msg : 'Owner not found' });
		else if (!ownerFound.active) return res.status(400).json({ ok : false, active : false, msg : 'Owner not active' });
		req.owner = ownerFound;
		next();
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const checkExistOwnerByDni = async (req, res, next) => {
	const { dni } = req.body;

	try {
		const ownerFound = await Owner.findOne({ dni });
		if (ownerFound) {
			if (!ownerFound.active) return res.status(400).json({ ok : false, active : false, equal : 'dni', msg : 'The owner already exists but not active' });
			return res.status(400).json({ ok : false, equal : 'dni', msg : 'The owner already exists' });
		}
		next();
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}