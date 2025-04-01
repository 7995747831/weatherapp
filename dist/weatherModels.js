"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
class Weather extends sequelize_1.Model {
}
Weather.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    weather: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    latitude: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    longitude: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
}, {
    sequelize: db_1.default,
    tableName: 'weather_data',
    timestamps: true, // Automatically add createdAt/updatedAt
});
exports.default = Weather;
//# sourceMappingURL=weatherModels.js.map