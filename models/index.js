const Game = require('./Game');
const Player = require('./Player');

Game.hasMany(Player, {
  foreignKey: 'player_id',
});

Player.belongsTo(Game, {
  foreignKey: 'player_id',
  onDelete: 'CASCADE'
});

module.exports = { Game, Player };
