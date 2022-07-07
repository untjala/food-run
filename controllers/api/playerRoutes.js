const router = require('express').Router();
const { Player, Game } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const playerData = await Player.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const playerData = await Player.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Game,
          attributes: ['player_id'],
        },
      ],
    });

    if (!playerData) {
      res.status(404).json({ message: 'No player matching this id!' });
      return;
    }
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
      req.session.player_id = playerData.id;
      req.session.username = playerData.username;
      req.session.loggedIn = true;
    });
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const playerData = await Player.findOne({
      where: { username: req.body.username },
    });

    if (!playerData) {
      res.status(404).json({ message: 'No user with that email address!' });
      return;
    }

    const password = playerData.checkPassword(req.body.password);

    if (!password) {
      res.status(404).json({ message: 'Invalid password!' });
      return;
    }

    req.session.save(() => {
      req.session.player_id = playerData.id;
      req.session.username = playerData.username;
      req.session.loggedIn = true;
    });

    res.json({ message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
