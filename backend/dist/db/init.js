"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = require('../config');
const username = config.db.username;
const password = config.db.password;
const database = config.db.database;
const host = config.db.host;
// Initialize sequelize connection to postgres db >
const dbConn = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres'
});
exports.default = dbConn;
