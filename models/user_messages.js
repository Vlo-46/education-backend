'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User_messages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User_messages.init({
        message_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seen_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        shipped: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'User_messages',
    });


    let User = sequelize.define('User')
    User_messages.hasOne(User, {
        foreignKey: 'receiver_id'
    })

    User_messages.hasOne(User, {
        foreignKey: 'sender_id'
    })

    let Message = sequelize.define('Message')
    User_messages.hasOne(Message, {
        foreignKey: 'message_id'
    })

    return User_messages;
};