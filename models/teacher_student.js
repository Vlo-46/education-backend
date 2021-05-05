'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_student.init({
        teacher_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Teacher_student',
    });


    return Teacher_student;
};