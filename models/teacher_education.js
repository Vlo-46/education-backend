'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_education extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_education.init({
        university: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        education: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Teacher_education',
    });

    let User = sequelize.define('User')
    Teacher_education.belongsTo(User, {
        foreignKey: 'id'
    })

    return Teacher_education;
};