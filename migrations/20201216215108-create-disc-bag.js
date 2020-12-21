'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DiscBag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      discId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      bagId: {
        allowNull: false,
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

    await queryInterface.addConstraint('DiscBag', {
      fields: ['discId', 'bagId'],
      type: 'unique',
      name: 'DiscBag_discId_bagId_fkey',
      primary: false,
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DiscBag');
  },
};
