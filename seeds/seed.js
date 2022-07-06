const sequelize = require('../config/connection');
const { Player } = require('../models');


const playerData = require('./playerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Player.bulkCreate(playerData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();