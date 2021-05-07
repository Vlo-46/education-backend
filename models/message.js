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
            allowNull: false,
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seen_status: DataTypes.BOOLEAN,
        shipped: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};