const router = require('express').Router();
const gameRoutes = require('./gameRoutes');
const homeRoutes = require('../homeRoutes');

router.use('/gameRoutes', gameRoutes);
router.use('/', homeRoutes);

module.exports = router;