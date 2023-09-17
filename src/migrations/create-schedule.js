'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      currentNumber: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      maxNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      timeSlotId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.BIGINT,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  },
};
