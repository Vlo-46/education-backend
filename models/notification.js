'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Notification.init({
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('during', 'approved', 'denied')
        },
        seen: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'Notification',
    });

    let User = sequelize.define('User')
    Notification.belongsTo(User, {
        foreignKey: 'id'
    })

    return Notification;
};