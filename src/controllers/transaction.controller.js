import Transaction from './../models/transaction.model';
import { transactionService } from './../helpers/transaction.helper';

export const getTransactions = async (req, res) => {
	try {
		const allTransactions = await Transaction.find().populate( 'car',  ['brand', 'model', 'patent', 'owner'] );
		res.json(allTransactions);
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const getTransaction = async (req, res) => {
	const { id } = req.params;

	try {
		const transaction = await Transaction.findById(id).populate( 'car',  ['brand', 'model', 'patent', 'owner'] );
		if (!transaction) return res.status(404).json({ ok : false, msg : 'Transaction not found' });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}

export const createTransaction = async (req, res) => {
	const { car, ...service } = req.body;

	try {
		const totalCost = await transactionService(service);
		if (totalCost == 0) return res.status(400).json({ ok : false, msg : 'You must select at least one service' });
		const newTransaction = new Transaction({
			...req.body,
			totalCost
		});
		const savedTransaction = await newTransaction.save();
		res.status(200).json({ ok : true, savedTransaction });
	} catch(err) {
		res.status(500).json({ ok : false, msg : err });
	}
}