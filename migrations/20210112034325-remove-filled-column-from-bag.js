'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bag', 'filled');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bag', 'filled', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
  },
};
