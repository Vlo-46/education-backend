'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_video extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_video.init({
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        video: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Teacher_video',
    });

    let User = sequelize.define('User')
    Teacher_video.belongsTo(User, {
        foreignKey: 'id'
    })

    return Teacher_video;
};