
 
const { Sequelize } = require('sequelize');
import { env } from './envConfig';
const sequelize = new Sequelize(
  env.databaseName,
  env.databaseUser,
  env.databasePassword,
  {
    host: env.databaseHost,
    dialect: env.databaseDialect,
    port: env.databasePort,
    logging: false, // Optional: Suppress SQL query logs
  }
);
 
 

 
// Authenticate DB connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connection established successfully.'))
  .catch((err:any) => console.error(' Unable to connect to the database:', err));
 
// Sync models with DB
sequelize.sync() 
  .then(() => console.log('✅ Models synchronized with the database.'))
  .catch((err:any) => console.error(' Unable to synchronize models with the database:', err));
 
export default sequelize;
 
 