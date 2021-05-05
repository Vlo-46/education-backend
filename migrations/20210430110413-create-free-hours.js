'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Free_hours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      start_time: {
        type: Sequelize.STRING,
        allowNull: true
      },
      end_time: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('approved', 'denied', 'during')
      },
      charged: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Free_hours');
  }
};