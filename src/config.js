import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;
export const DATABASE = process.env.DATABASE;
export const HOST = process.env.HOST;
export const CONNECTION = process.env.CONNECTION;