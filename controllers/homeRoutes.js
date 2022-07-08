const router = require('express').Router();
const { Player } = require('../models');

router.get('/', async (req, res) => {
  try {
    const playerData = await Player.findAll();

    const players = playerData.map((player) => player.get({ plain: true }));

    console.log('SESSSION', req.session);
    res.render('index', {
      players,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/game', async (req, res) => {
  try {
    res.render('game', { layout: false, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const playerData = Player.findByPk(req.session.player_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: [Player],
          attributes: 'player_id',
        },
      ],
    });

    const player = playerData.get({ plain: true });

    res.render('index', {
      player,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
