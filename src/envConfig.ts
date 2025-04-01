import { config } from 'dotenv';

config();

export const env = {
  databaseName: process.env.DATABASE_NAME as string,
  databaseUser: process.env.DATABASE_USER as string,
  databasePassword: process.env.DATABASE_PASSWORD as string,
  databaseHost: process.env.DATABASE_HOST as string,
  databaseDialect: process.env.DATABASE_DIALECT as string,
  databasePort: Number(process.env.DATABASE_PORT),
  xapikey: process.env.X_API_KEY as string,
};