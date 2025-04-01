import express from 'express';
import sequelize from './db';
import weatherRoutes from './weatherRoute';
 
const app = express();
const port = 3000;
 
app.use(express.json());
app.use('/api', weatherRoutes); // ✅ Prefix all routes with /api
 
// Ensure database connection before starting the server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
 
    // Sync models before listening
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synchronized with DB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error('DB Connection Error:', err));
 