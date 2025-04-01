"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const weatherRoute_1 = __importDefault(require("./weatherRoute"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', weatherRoute_1.default); // ✅ Prefix all routes with /api
// Ensure database connection before starting the server
db_1.default
    .authenticate()
    .then(() => {
    console.log('Database connected');
    // Sync models before listening
    return db_1.default.sync();
})
    .then(() => {
    console.log('Models synchronized with DB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
    .catch((err) => console.error('DB Connection Error:', err));
//# sourceMappingURL=app.js.map