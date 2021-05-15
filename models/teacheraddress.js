'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TeacherAddress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    TeacherAddress.init({
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false

        }
    }, {
        sequelize,
        modelName: 'TeacherAddress',
    });

    let User = sequelize.define('User')
    TeacherAddress.belongsTo(User, {
        foreignKey: 'id'
    })

    return TeacherAddress;
};