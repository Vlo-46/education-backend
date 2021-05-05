'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Blog.init({
        image: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Blog',
    });

    let Blog_Comments = sequelize.define('Blog_comments')
    Blog.hasMany(Blog_Comments, {
        foreignKey: 'blog_id'
    })

    return Blog;
};