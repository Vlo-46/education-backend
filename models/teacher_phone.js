'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_phone extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_phone.init({
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Teacher_phone',
    });

    let User = sequelize.define('User')
    Teacher_phone.belongsTo(User, {
        foreignKey: 'id'
    })

    return Teacher_phone;
};