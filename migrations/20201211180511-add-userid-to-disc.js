'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Disc', 'userId', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });

    await queryInterface.bulkUpdate('Disc', {
      userId: 1,
    });

    await queryInterface.changeColumn('Disc', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Disc', 'userId');
  },
};
