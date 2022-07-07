const router = require('express').Router();
const { Player } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const playerData = await Player.findAll({
      include: [
        {
          model: Player,
          attributes: ['username'],
        },
      ],
    });

    const players = playerData.map((player) => player.get({ plain: true }));

    res.render('main', {
      players,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
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

    res.render('main', {
      player,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const playerData = await Player.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = playerData.id;
      req.session.username = playerData.username;
      req.session.loggedIn = true;
    });
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
