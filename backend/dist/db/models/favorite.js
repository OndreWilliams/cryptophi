'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const init_1 = __importDefault(require("../init"));
class Favorite extends sequelize_1.Model {
}
Favorite.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    instrument: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: init_1.default,
    tableName: 'Favorites',
});
exports.default = Favorite;
