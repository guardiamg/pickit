import express from 'express';
import morgan from 'morgan';
import { PORT } from './config';
import cors from 'cors';

import { createServices } from './libs/initialSetup';
import ownerRoutes from './routes/owner.route';
import carRoutes from './routes/car.route';
import transactionRoutes from './routes/transaction.route';

// Run Express
const app = express();

//Initial Services setup (create services if they don't exist)
createServices();

// Settings
app.set('port', PORT);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/owner', ownerRoutes);
app.use('/api/car', carRoutes);
app.use('/api/transaction', transactionRoutes);

export default app;