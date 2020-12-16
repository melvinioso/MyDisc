'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bag', 'userId', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });

    await queryInterface.bulkUpdate('Bag', {
      userId: 1,
    });

    await queryInterface.changeColumn('Bag', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Bag', 'userId');
  },
};
