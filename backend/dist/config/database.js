"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('./index');
const username = config.db.username;
const password = config.db.password;
const database = config.db.database;
const host = config.db.host;
exports.default = {
    development: {
        username,
        password,
        database,
        host,
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
