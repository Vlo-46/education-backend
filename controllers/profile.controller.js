const jwt = require('jsonwebtoken')
const keys = require('../utils/keys')
const db = require('../models')
const User = db.users
const Free_hours = db.free_hourses
const Teacher_students = db.teacher_students


// teacher calendar
const createTeacherFreeHours = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const {date, start_time, end_time} = req.body;
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        let user = await User.findOne({where: {id: candidate.id}});

        res.send({user, date, start_time, end_time})
    }
}

module.exports = {createTeacherFreeHours}