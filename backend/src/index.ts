import express from 'express';
import User from './db/models/user';
import dbConn from './db/init';

const app = express();
const { port } = require('./config');

dbConn
  .sync({
    logging: console.log,
    force: true
  })
  .then(() => {
    console.log('Database sync success! Sequelize is ready to use...');

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .then(() => {
    User.create({
      username: 'Demo',
      email: 'demo@cryptophi.io',
      hashedPassword: 'password'
    })
    .catch((err: any) => {
      console.log('Error creating demo user');
    });
  })
  .catch((err: any) => {
    console.log('Database sycn failure.');
    console.error(err);
  });
