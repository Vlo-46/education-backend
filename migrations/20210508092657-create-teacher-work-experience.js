'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Teacher_work_experiences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            teacher_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            company: {
                type: Sequelize.STRING,
                allowNull: false
            },
            start_date: {
                type: Sequelize.STRING,
                allowNull: false
            },
            end_date: {
                type: Sequelize.STRING,
                allowNull: false
            },
            profession: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('Teacher_work_experiences');
    }
};