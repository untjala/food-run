const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
<<<<<<< HEAD


module.exports = Project;
=======
const bcrypt = require('bcrypt');

class Player extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    score_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newPlayerData) => {
        newPlayerData.password = await bcrypt.hash(newPlayerData.password, 10);
        return newPlayerData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'player',
  }
);

module.exports = Player;
>>>>>>> 09346031ec79804218c910a5aee8f911b75eead0
