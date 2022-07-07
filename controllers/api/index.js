const router = require('express').Router();
const gameRoutes = require('./gameRoutes');
const playerRoutes = require('./playerRoutes');

router.use('/games', gameRoutes);
router.use('/players', playerRoutes);

module.exports = router;