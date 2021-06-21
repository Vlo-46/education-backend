'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Lessons_hours extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Lessons_hours.init({
        teacher_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        notification_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hours: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Lessons_hours',
    });

    let Notification = sequelize.define('Notification')
    Lessons_hours.belongsTo(Notification, {
        foreignKey: 'id'
    })

    return Lessons_hours;
};