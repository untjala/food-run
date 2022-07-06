const router = require('express').Router();
const {Game, Player} = require('../models');
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

    const posts = playerData.map((player) => player.get({ plain: true }));

    res.render('startPage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const playerData = Player.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: [Player] }],
    });

    const player = playerData.get({ plain: true });

    res.render('startPage', {
      player,
      loggedIn: true,
    });
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