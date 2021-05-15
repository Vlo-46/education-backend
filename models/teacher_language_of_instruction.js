'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_language_of_instruction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_language_of_instruction.init({
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Teacher_language_of_instruction',
    });

    let User = sequelize.define('User')
    Teacher_language_of_instruction.belongsTo(User, {
        foreignKey: 'id'
    })

    return Teacher_language_of_instruction;
};