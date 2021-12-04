import express, { Application, Request, Response, NextFunction } from 'express';
const asyncHandler = require('express-async-handler');
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app: Application = express();

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
