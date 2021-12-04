"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./db/models/user"));
const init_1 = __importDefault(require("./db/init"));
const app = require('./app');
const { port } = require('./config');
// Create postgres db tables,
// start the server, and register demo user
init_1.default
    .sync({
    logging: console.log,
    force: true
})
    .then(() => {
    console.log('Database sync success! Sequelize is ready to use...');
    app.listen(port, () => console.log(`Listening on port ${port}...`));
})
    .then(() => {
    user_1.default.create({
        username: 'Demo',
        email: 'demo@cryptophi.io',
        hashedPassword: 'password'
    })
        .catch((err) => {
        console.log('Error creating demo user');
    });
})
    .catch((err) => {
    console.log('Database sycn failure.');
    console.error(err);
});
