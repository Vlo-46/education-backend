'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Subject.init({
        name: DataTypes.STRING,
        icon: DataTypes.TEXT,
        image: DataTypes.TEXT,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Subject',
    });

    let subSubject = sequelize.define('SubSubject')
    Subject.hasMany(subSubject, {
        foreignKey: 'subject_id',
        onDelete: 'cascade'
    })

    return Subject;
};