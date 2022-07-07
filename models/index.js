const Game = require('./Game');
const Player = require('./Player');
// const PlayerGames = require('./PlayerGames');

Player.belongsTo(Game, {
  foreignKey: 'player_id',
});

Game.hasMany(Player, {
  foreignKey: 'player_id',
  onDelete: 'CASCADE'
});

// PlayerGame.hasMany(Player)



module.exports = { Game, Player };
