'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Free_times extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Free_times.init({
        teacher_id: DataTypes.INTEGER,
        start_time: DataTypes.STRING,
        end_time: DataTypes.STRING,
        charged: DataTypes.BOOLEAN,
        weekday: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Free_times',
    });
    return Free_times;
};