'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Free_hours extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Free_hours.init({
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: DataTypes.ENUM('approved', 'denied', 'during'),
        charged: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Free_hours',
    });

    let User = sequelize.define('User')
    Free_hours.belongsTo(User, {
        foreignKey: 'id'
    })

    return Free_hours;
};