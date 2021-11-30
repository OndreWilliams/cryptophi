const config = require('./index');

const username = config.db.username;
const password = config.db.password;
const database = config.db.database;
const host = config.db.host;

export default {
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
