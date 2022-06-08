import mongoose from 'mongoose';
import { DATABASE, HOST, CONNECTION } from './../config';

const connectionString = `${CONNECTION}://${HOST}/${DATABASE}`;

mongoose.connect(connectionString)
		.then(db => console.info('Database connection has been established successfully'))
		.catch(err => console.error("Database connection has not been established: ", err));