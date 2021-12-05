import express, { Request, Response, NextFunction } from 'express';
const asyncHandler = require('express-async-handler');
import { serverError } from './errorUtil';
import Note from '../../db/models/note';
const notesRouter = express.Router();

// Add a note to database and return updated notes list >
notesRouter.post('', asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, note }: {userId: number; note: string} = req.body;

    await Note.create({
      userId,
      content: note,
    }).catch(err => next(serverError('Failed to add Note')));

    await Note.findAll({
      attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']},
      where: {
        userId
      }
    }).then((notes) => {
      return res.json({
        notes
      });
    }).catch(err => next(serverError('Failed to get updated Notes')));

}));

// Get and return current favorites list >
notesRouter.get('/:id(\\d+)', asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    await Note.findAll({
      attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']},
      where: {
        userId
      }
    }).then((notes) => {
      return res.json({
        notes
      });
    }).catch(err => next(serverError('Failed to get user notes')));
}));

module.exports = notesRouter;
