"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = void 0;
const apiTypes_1 = require("./apiTypes");
// Custom error to send on db/server failure >
const serverError = (title) => {
    const serverError = new apiTypes_1.StatusError(500, title);
    return serverError;
};
exports.serverError = serverError;
