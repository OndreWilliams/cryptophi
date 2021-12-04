import { Sequelize } from 'sequelize';
const config = require('../config');

const username = config.db.username;
const password = config.db.password;
const database = config.db.database;
const host = config.db.host;

// Initialize sequelize connection to postgres db >
const dbConn = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres'
});

export default dbConn;
