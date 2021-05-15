'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_review.init({
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Teacher_review',
    });

    let User = sequelize.define('User')
    Teacher_review.belongsTo(User, {
        foreignKey: 'id'
    })

    return Teacher_review;
};