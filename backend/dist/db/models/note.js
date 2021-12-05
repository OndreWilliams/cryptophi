'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const init_1 = __importDefault(require("../init"));
class Note extends sequelize_1.Model {
}
Note.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING(4096),
        allowNull: false
    }
}, {
    sequelize: init_1.default,
    tableName: 'Notes'
});
exports.default = Note;
