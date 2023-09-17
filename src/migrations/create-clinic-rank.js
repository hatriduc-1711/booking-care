'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClinicRank', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      clinicId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      rankId: {
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
    await queryInterface.dropTable('ClinicRank');
  },
};
