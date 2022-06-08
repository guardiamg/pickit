import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
	service : String,
	value : Number
}, { timestamps : true, versionKey : false });

export default model('Service', serviceSchema);