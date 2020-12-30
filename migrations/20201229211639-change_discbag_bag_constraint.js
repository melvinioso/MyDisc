'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Bag', {
      fields: ['userId'],
      type: 'FOREIGN KEY',
      name: 'Bag_userId_fkey',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Disc', {
      fields: ['userId'],
      type: 'FOREIGN KEY',
      name: 'Disc_userId_fkey',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Profile', {
      fields: ['userId'],
      type: 'FOREIGN KEY',
      name: 'Profile_userId_fkey',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Email', {
      fields: ['userId'],
      type: 'FOREIGN KEY',
      name: 'Email_userId_fkey',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Email', 'Email_userId_fkey');
    await queryInterface.removeConstraint('Profile', 'Profile_userId_fkey');
    await queryInterface.removeConstraint('Disc', 'Disc_userId_fkey');
    await queryInterface.removeConstraint('Bag', 'Bag_userId_fkey');
  },
};
