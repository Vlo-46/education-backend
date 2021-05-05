const {body} = require('express-validator');
const db = require('../models')
const Student = db.students;
const Teacher = db.teachers;

exports.registerValidators = [
    body('name')
        .isLength({min: 2, max: 50}),
    body('surname')
        .isLength({min: 2, max: 50}),
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .isLength({min: 8, max: 50})
        .trim(),
]