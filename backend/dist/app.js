"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler = require('express-async-handler');
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = (0, express_1.default)();
// Apply middleware for security and data processing >
app.use(helmet({ contentSecurityPolicy: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Register routes >
app.use(routes);
// app.use((req: Request, res: Response, next) => {
//   // not found redirect;
// });
module.exports = app;
