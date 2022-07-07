const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PlayerGames extends Model {}

PlayerGames.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'id',
      },
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'player',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'game',
  }
);

module.exports = PlayerGames;
