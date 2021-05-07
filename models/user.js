'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: DataTypes.ENUM('student', 'teacher', 'admin'),
        image: DataTypes.STRING,
        profession: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });

    let Free_hours = sequelize.define('Free_hours')
    User.hasMany(Free_hours, {
        foreignKey: 'teacher_id'
    })

    // let Teacher_student = sequelize.define('Teacher_student')
    // User.hasMany(Teacher_student, {
    //     foreignKey: 'student_id',
    // })
    //
    // User.hasMany(Teacher_student, {
    //     foreignKey: 'teacher_id',
    // })

    return User;
};