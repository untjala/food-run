const router = require('express').Router();
const { Player } = require('../models');

//finds all player info and session info
router.get('/', async (req, res) => {
  try {
    const playerData = await Player.findAll();

    const players = playerData.map((player) => player.get({ plain: true }));

    console.log('SESSION', req.session);
    res.render('index', {
      players,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('500 Error');
  }
});

//renders game
router.get('/game', async (req, res) => {
  try {
    res.render('game', { layout: false, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//renders end screen
router.get('/end', async (req, res) => {
  try {
    res.render('end', { layout: false, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//grabs a player by id and renders to index
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
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
