const Game = require('./Game');
const Player = require('./Player');

Player.belongsTo(Game, {
  foreignKey: 'player_id',
});

Game.hasMany(Player, {
  foreignKey: 'player_id',
  onDelete: 'CASCADE'
});


module.exports = { Game, Player };
