'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog_comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Blog_comments.init({
        blog_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        comment: DataTypes.TEXT,
        date: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Blog_comments',
    });
    let Blog = sequelize.define('Blog')
    Blog_comments.belongsTo(Blog, {
        foreignKey: 'id'
    })

    return Blog_comments;
};