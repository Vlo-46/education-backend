'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.blogs = require('./blog')(sequelize, Sequelize)
db.blog_comments = require('./blog_comments')(sequelize, Sequelize)
db.subject = require('./subject')(sequelize, Sequelize)
db.subSubject = require('./subsubject')(sequelize, Sequelize)
db.users = require('./user')(sequelize, Sequelize)
db.free_hourses = require('./free_hours')(sequelize, Sequelize)
db.message = require('./message')(sequelize, Sequelize)
db.teacher_review = require('./teacher_review')(sequelize, Sequelize)
db.teacher_education = require('./teacher_education')(sequelize, Sequelize)
db.teacher_certificate = require('./teacher_certificates')(sequelize, Sequelize)
db.teacher_work_experience = require('./teacher_work_experience')(sequelize, Sequelize)
db.teacher_language_of_instruction = require('./teacher_language_of_instruction')(sequelize, Sequelize)
db.teacherAddress = require('./teacheraddress')(sequelize, Sequelize)
db.teacher_phone = require('./teacher_phone')(sequelize, Sequelize)
db.teacher_video = require('./teacher_video')(sequelize, Sequelize)
db.notification = require('./notification')(sequelize, Sequelize)


module.exports = db;
