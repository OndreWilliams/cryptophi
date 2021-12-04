import express, { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize/dist';
import Favorite from '../../db/models/favorite';
import { StatusError } from './apiTypes';
const asyncHandler = require('express-async-handler');


const favoritesRouter = express.Router();

// Add a favorite to database and return updated favorites list >
favoritesRouter.post('', asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId }: {userId: number} = req.body;
    const {
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
    }: {
      pairId: string;
      base_currency: string;
      quote_currency: string;
      base_min_size: string;
      base_max_size: string;
      base_increment: string;
      display_name: string;
      margin_enabled: boolean;
      fx_stablecoin: boolean;
      trading_disabled: boolean;
      status: string;
    } = req.body.pair;

    await Favorite.create({
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

    await Favorite.findAll({
      attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']},
      where: {
        userId
      }
    }).then((favorites) => {
      return res.json({
        favorites
      });
    }).catch(err => next(favoriteError('Failed to get updated favorites')));

}));

// Get and return current favorites list >
favoritesRouter.get('/:id(\\d+)', asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    await Favorite.findAll({
      attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']},
      where: {
        userId
      }
    }).then((favorites) => {
      return res.json({
        favorites
      });
    }).catch(err => next(favoriteError('Failed to get user favorites')));
}));

// Remove a favorite from database and return updated favorites list >
favoritesRouter.delete('', asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, pairId } = req.body;
    await Favorite.destroy({
      where: {
        [Op.and]: [{userId: userId}, {pairId: pairId}]
      }
    }).catch(err => next(favoriteError('Failed to get remove favorite')));

    await Favorite.findAll({
      attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']},
      where: {
        userId
      }
    }).then((favorites) => {
      return res.json({
        favorites
      });
    }).catch(err => next(favoriteError('Failed to get updated favorites')));
}));

// Custom error to send on db/server failure >
const favoriteError = (title: string): StatusError => {
  const favoriteError = new StatusError(500, title);
  return favoriteError;
};

module.exports = favoritesRouter;
