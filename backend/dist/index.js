"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./db/models/user"));
const init_1 = __importDefault(require("./db/init"));
const app = (0, express_1.default)();
const { port } = require('./config');
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
