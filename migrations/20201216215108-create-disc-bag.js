'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DiscBag', {
      discId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bagId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('DiscBag', {
      fields: ['discId'],
      type: 'FOREIGN KEY',
      name: 'DiscBag_discId_fkey',
      references: {
        table: 'Disc',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('DiscBag', {
      fields: ['bagId'],
      type: 'FOREIGN KEY',
      name: 'DiscBag_bagId_fkey',
      references: {
        table: 'Bag',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DiscBag');
  },
};
