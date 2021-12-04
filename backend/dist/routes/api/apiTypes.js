"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusError = void 0;
// Definition for custom error to send on db/server failure >
class StatusError extends Error {
    constructor(status, title, message) {
        super(message);
        this.status = status;
        this.title = title;
    }
}
exports.StatusError = StatusError;
