import { Schema, model } from 'mongoose';

const ownerSchema = new Schema({
	name : {
		type : String,
		required : true
	},
	lastName : {
		type : String,
		required : true
	},
	dni : {
		type : String,
		required : true
	},
	cars : [{
		type : Schema.Types.ObjectId,
		ref : 'Car',
	}],
	active : {
		type : Boolean,
		default : true
	}
});

ownerSchema.method('toJSON', function() {
	const { __v, _id, active, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default model('Owner', ownerSchema);