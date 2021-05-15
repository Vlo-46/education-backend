'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_work_experience extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_work_experience.init({
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Teacher_work_experience',
    });

    let User = sequelize.define('User')
    Teacher_work_experience.belongsTo(User, {
        foreignKey: 'id'
    })

    return Teacher_work_experience;
};