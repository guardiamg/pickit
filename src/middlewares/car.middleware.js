import mongoose from 'mongoose';
import Car from './../models/car.model';
import Owner from './../models/owner.model';

export const checkExistCarById = async (req, res, next) => {
	const id = req.body.car ? req.body.car : req.params.id;
	
	try {
		const carFound = await Car.findById(id);
		if (!carFound) return res.status(404).json({ ok : false, msg : 'Car not found' });
		else if (!carFound.active) return res.status(404).json({ ok : false, active : false, msg : 'Car not active' });
		req.car = carFound;
		next();
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const checkExistCarByPatent = async (req, res, next) => {
	const { patent } = req.body;

	try {
		const carFound = await Car.findOne({ patent });
		if (carFound) {
			if (!carFound.active) return res.status(400).json({ ok : false, active : false, equal : 'patent', msg : 'The car already exists but not active' });
			return res.status(400).json({ ok : false, equal : 'patent', msg : 'The car already exists' });
		}
		next();
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const checkExistOwnerById = async (req, res, next) => {
	const { owner } = req.body;

	try {
		const ownerFound = await Owner.findById(owner);
		if (!ownerFound) return res.status(404).json({ ok : false, msg : 'Owner not found' });
		else if (!ownerFound.active) return res.status(404).json({ ok : false, active : false, msg : 'Owner not active' });
		req.owner = ownerFound;
		next();
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}