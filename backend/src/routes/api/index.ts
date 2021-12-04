const router = require('express').Router();
const notesRouter = require('./notes');
const favoritesRouter = require('./favorites');


router.use('/notes', notesRouter);

router.use('/favorites', favoritesRouter);


module.exports = router;
