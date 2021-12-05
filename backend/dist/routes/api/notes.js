"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler = require('express-async-handler');
const errorUtil_1 = require("./errorUtil");
const note_1 = __importDefault(require("../../db/models/note"));
const notesRouter = express_1.default.Router();
// Add a note to database and return updated notes list >
notesRouter.post('', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, note } = req.body;
    yield note_1.default.create({
        userId,
        content: note,
    }).catch(err => next((0, errorUtil_1.serverError)('Failed to add Note')));
    yield note_1.default.findAll({
        attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
        where: {
            userId
        }
    }).then((notes) => {
        return res.json({
            notes
        });
    }).catch(err => next((0, errorUtil_1.serverError)('Failed to get updated Notes')));
})));
// Get and return current favorites list >
notesRouter.get('/:id(\\d+)', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    yield note_1.default.findAll({
        attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
        where: {
            userId
        }
    }).then((notes) => {
        return res.json({
            notes
        });
    }).catch(err => next((0, errorUtil_1.serverError)('Failed to get user notes')));
})));
module.exports = notesRouter;
