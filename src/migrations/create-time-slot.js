'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeSlots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      timeSlot: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING(10),
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
    await queryInterface.dropTable('TimeSlots');
  },
};
