"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres', 'Akhil123$', {
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
exports.default = sequelize;
//# sourceMappingURL=db.js.map