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

    let Teacher_review = sequelize.define('Teacher_review')
    User.hasMany(Teacher_review, {
        foreignKey: 'teacher_id'
    })

    let Teacher_education = sequelize.define('Teacher_education')
    User.hasMany(Teacher_education, {
        foreignKey: 'teacher_id'
    })

    let Teacher_certificates = sequelize.define('Teacher_certificates')
    User.hasMany(Teacher_certificates, {
        foreignKey: 'teacher_id'
    })

    let Teacher_work_experience = sequelize.define('Teacher_work_experience')
    User.hasMany(Teacher_work_experience, {
        foreignKey: 'teacher_id'
    })

    let Teacher_language_of_instruction = sequelize.define('Teacher_language_of_instruction')
    User.hasMany(Teacher_language_of_instruction, {
        foreignKey: 'teacher_id'
    })

    let TeacherAddress = sequelize.define('TeacherAddress')
    User.hasMany(TeacherAddress, {
        foreignKey: 'teacher_id'
    })

    let Teacher_phone = sequelize.define('Teacher_phone')
    User.hasMany(Teacher_phone, {
        foreignKey: 'teacher_id'
    })

    let Teacher_video = sequelize.define('Teacher_video')
    User.hasMany(Teacher_video, {
        foreignKey: 'teacher_id'
    })

    let Notification = sequelize.define('Notification')
    User.hasMany(Notification, {
        foreignKey: 'teacher_id'
    })

    return User;
};