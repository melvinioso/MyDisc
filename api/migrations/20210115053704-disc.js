'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Disc', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mold: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      plastic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      speed: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      glide: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      turn: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fade: {
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

    await queryInterface.addConstraint('Disc', {
      fields: ['userId'],
      type: 'FOREIGN KEY',
      name: 'Disc_userId_fkey',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Disc');
  },
};
