import Owner from './../models/owner.model';

export const getOwners = async (req, res) => {
	try {
		const owners = await Owner.find().where('active').equals(true).populate({ path : 'cars', match: { active: true }, select: ['brand', 'model', 'patent'] });
		res.status(200).json({ ok : true, owners });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const getOwner = async (req, res) => {
	const { id } = req.params;

	try {
		const owner = await Owner.findById(id).where('active').equals(true).populate({ path : 'cars', match: { active: true }, select: ['brand', 'model', 'patent'] });
		if (!owner) return res.status(404).json({ ok : false, msg : 'Owner not found' });
		res.status(200).json({ ok : true, owner });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const createOwner = async (req, res) => {
	const newOwner = new Owner({
		...req.body
	});

	try {
		const saveOwner = await newOwner.save();
		res.status(200).json({ ok : true, saveOwner });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const updateOwner = async (req, res) => {
	// const { id } = req.params;
	const { owner } = req;
	const changesOwner = { ...req.body };

	try {
		const updatedOwner = await Owner.findByIdAndUpdate(owner.id, changesOwner, { new : true });
		res.status(200).json({ ok : true, updatedOwner });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const deleteOwner = async (req, res) => {
	const { id } = req.params;
	const ownerActive = { active : false };

	try {
		const deletedOwner = await Owner.findByIdAndUpdate(id, ownerActive, { new : true });
		res.status(200).json({ ok : true, msg : 'Owner deleted', deletedOwner });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}