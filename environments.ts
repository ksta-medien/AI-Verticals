import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = process.env.ENV || 'local';
export const MANDATOR = process.env.MANDATOR;
