import { Schema, model } from 'mongoose';

const carSchema = new Schema({
	brand : {
		type : String,
		required : true
	},
	model : {
		type : String,
		required : true
	},
	year : {
		type : Number,
		required : true
	},
	patent : {
		type : String,
		uppercase: true,
		required : true
	},
	color : {
		type : String,
		lowercase: true,
		required : true
	},
	owner : {
		type : Schema.Types.ObjectId,
		ref : 'Owner',
		required : true
	},
	active : {
		type : Boolean,
		default : true
	}
});

carSchema.method('toJSON', function() {
	const { __v, _id, active, ...object } = this.toObject();
	object.id = _id;
	return object;
});

export default model('Car', carSchema);