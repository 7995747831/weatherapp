import dotenv from 'dotenv';
 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,
    logging: false, // Optional: Suppress SQL query logs
  }
);
 
 
import { Sequelize } from 'sequelize';
 
const sequelize = new Sequelize('postgres', 'postgres', 'Akhil123$', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false, // Optional: Suppress SQL query logs
});
 
// Authenticate DB connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connection established successfully.'))
  .catch((err) => console.error(' Unable to connect to the database:', err));
 
// Sync models with DB
sequelize.sync() 
  .then(() => console.log('✅ Models synchronized with the database.'))
  .catch((err) => console.error(' Unable to synchronize models with the database:', err));
 
export default sequelize;
 
 