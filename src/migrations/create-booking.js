'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      patientId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      timeSlotId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Bookings');
  },
};
