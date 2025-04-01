
 
 
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
 
 