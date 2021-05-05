'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Message.init({
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Message',
    });

    //has one user message id
    let User_message = sequelize.define('User_messages')
    Message.hasMany(User_message, {
        foreignKey: 'id'
    })

    return Message;
};