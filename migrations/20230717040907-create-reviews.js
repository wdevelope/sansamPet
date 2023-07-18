'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      reviewId: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      reservationId: {
        allowNull: false,
        references: {
          model: 'Reservations',
          key: 'reservationId',
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      petsitterId: {
        allowNull: false,
        references: {
          model: 'Petsitters',
          key: 'petsitterId',
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      userID: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userID',
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      star: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  },
};
