const router = require('express').Router();
const { Game } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const gameData = await Game.create(req.body);

    req.session.save(() => {
      req.session.player_id = gameData.player_id;
      req.session.loggedIn = true;

      res.status(200).json(gameData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const gameData = await Game.destroy({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Game,
          attributes: ['id'],
        },
      ],
    });

    if (!gameData) {
      res.status(404).json({ message: 'No game found with at id!' });
      return;
    }

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;