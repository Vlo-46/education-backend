'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Free_times', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            teacher_id: {
                type: Sequelize.INTEGER
            },
            start_time: {
                type: Sequelize.STRING
            },
            end_time: {
                type: Sequelize.STRING
            },
            charged: {
                type: Sequelize.BOOLEAN
            },
            weekday: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Free_times');
    }
};