import Car from './../models/car.model';
import Owner from './../models/owner.model';

export const getCars = async (req, res) => {
	try {
		const cars = await Car.find().where('active').equals(true).populate('owner', ['name', 'lastName']);
		res.status(200).json({ ok : true, cars });
	} catch(e) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const getCar = async (req, res) => {
	const { id } = req.params;

	try {
		const car = await Car.findById(id).where('active').equals(true).populate('owner', ['name', 'lastName', 'dni']);
		if (!car) return res.status(404).json({ ok : false, msg : 'Car not found' });
		res.status(200).json({ ok : true, car });
	} catch(e) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const createCar = async (req, res) => {
	const { owner } = req;
	const newCar = new Car({
		...req.body
	});

	try {
		const saveCar = await newCar.save();
		await Owner.findByIdAndUpdate(owner.id, { $push: { 'cars': saveCar.id } });
		res.status(200).json({ ok : true, saveCar });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const updateCar = async (req, res) => {
	const { id } = req.params;
	const changesCar = { ...req.body };

	try {
		const updatedCar = await Car.findByIdAndUpdate(id, changesCar, { new : true });
		res.status(200).json({ ok : true, updatedCar });
	} catch(e) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const deleteCar = async (req, res) => {
	const { id } = req.params;
	const carActive = { active : false };

	try {
		const deletedCar = await Car.findByIdAndUpdate(id, carActive, { new : true });
		res.status(200).json({ ok : true, msg : 'Car deleted', deletedCar });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}