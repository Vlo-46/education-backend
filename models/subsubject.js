'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubSubject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    SubSubject.init({
        subject_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'SubSubject',
    });

    let Subject = sequelize.define('Subject')
    SubSubject.belongsTo(Subject, {
        foreignKey: 'id'
    })

    return SubSubject;
};