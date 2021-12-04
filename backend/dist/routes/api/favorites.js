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
const dist_1 = require("sequelize/dist");
const favorite_1 = __importDefault(require("../../db/models/favorite"));
const apiTypes_1 = require("./apiTypes");
const asyncHandler = require('express-async-handler');
const favoritesRouter = express_1.default.Router();
// Add a favorite to database and return updated favorites list >
favoritesRouter.post('', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const { pairId, base_currency, quote_currency, base_min_size, base_max_size, base_increment, display_name, margin_enabled, fx_stablecoin, trading_disabled, status } = req.body.pair;
    yield favorite_1.default.create({
        userId,
        pairId,
        base_currency,
        quote_currency,
        base_min_size,
        base_max_size,
        base_increment,
        display_name,
        margin_enabled,
        fx_stablecoin,
        trading_disabled,
        status
    }).catch(err => next(favoriteError('Failed to add favorite')));
    yield favorite_1.default.findAll({
        attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
        where: {
            userId
        }
    }).then((favorites) => {
        return res.json({
            favorites
        });
    }).catch(err => next(favoriteError('Failed to get updated favorites')));
})));
// Get and return current favorites list >
favoritesRouter.get('/:id(\\d+)', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    yield favorite_1.default.findAll({
        attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
        where: {
            userId
        }
    }).then((favorites) => {
        return res.json({
            favorites
        });
    }).catch(err => next(favoriteError('Failed to get user favorites')));
})));
// Remove a favorite from database and return updated favorites list >
favoritesRouter.delete('', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, pairId } = req.body;
    yield favorite_1.default.destroy({
        where: {
            [dist_1.Op.and]: [{ userId: userId }, { pairId: pairId }]
        }
    }).catch(err => next(favoriteError('Failed to get remove favorite')));
    yield favorite_1.default.findAll({
        attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
        where: {
            userId
        }
    }).then((favorites) => {
        return res.json({
            favorites
        });
    }).catch(err => next(favoriteError('Failed to get updated favorites')));
})));
// Custom error to send on db/server failure >
const favoriteError = (title) => {
    const favoriteError = new apiTypes_1.StatusError(500, title);
    return favoriteError;
};
module.exports = favoritesRouter;
