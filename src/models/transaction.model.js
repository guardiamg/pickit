import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
	car : {
		type : Schema.Types.ObjectId,
		ref : 'Car',
		required : true
	},
	oil : {
		type : Boolean
	},
	filter : {
		type : Boolean
	},
	strap : {
		type : Boolean
	},
	general : {
		type : Boolean
	},
	paint : {
		type : Boolean
	},
	other : {
		type : Boolean
	},
	totalCost : {
		type : Number,
		required : true
	}
}, { timestamps: true });

transactionSchema.method('toJSON', function() {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default model('Transaction', transactionSchema);