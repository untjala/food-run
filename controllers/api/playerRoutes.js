const router = require('express').Router();
const { Player } = require('../../models');

router.post('/', async (req, res) => {
  try {

    const playerData = await Player.create(req.body);

    console.log(playerData);

    const player = JSON.parse(JSON.stringify(playerData));

    console.log(player);

    req.session.save(() => {
      req.session.player_id = player.id;
      req.session.username = player.username;
      req.session.loggedIn = true;
      res.status(200).json(player);
    });
  } catch (err) {
    console.log(err);
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
      res.json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
