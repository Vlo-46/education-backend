const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const keys = require('../utils/keys');

const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const Free_hours = db.free_hours
const Teacher_review = db.teacher_review
const Teacher_education = db.teacher_education
const Teacher_certificate = db.teacher_certificate
const Teacher_work_experience = db.teacher_work_experience
const Teacher_language_of_instruction = db.teacher_language_of_instruction
const TeacherAddress = db.teacherAddress
const Teacher_phone = db.teacher_phone
const Teacher_video = db.teacher_video

// register user
const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.send({msg: 'error', errors}) // if there is an error,this block will work
    } else {
        const {name, surname, email, password, confirm, phone, role} = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({where: {email}});
        if (user) {
            res.send({msg: 'Այդպիսի օգտատեր արդեն գոյություն ունի'}) // if there is such a user, this block will work
        } else {
            if (req.body.role === 'student') {
                //Student registration
                User.create({
                    name,
                    surname,
                    email,
                    phone,
                    role,
                    password: hashPassword,
                    profession: null
                })
                    .then(data => {
                        // if everything is in order, we register the token and send it frontend
                        const token = jwt.sign({id: data.id}, keys.jwtSecret)
                        res.send({data, token})
                    })
                    .catch(e => {
                        // if there are problems with registration, this block will work
                        res.send({msg: e})
                    })
            } else if (req.body.role === 'teacher') {
                //Teacher registration
                User.create({
                    name,
                    surname,
                    email,
                    phone,
                    role,
                    password: hashPassword,
                    profession: req.body.profession
                })
                    .then(data => {
                        // if everything is in order, we register the token and send it frontend
                        const token = jwt.sign({id: data.id}, keys.jwtSecret)
                        res.send({data, token})
                    })
                    .catch(e => {
                        // if there are problems with registration, this block will work
                        res.send({msg: e})
                    })
            }
        }
    }
};

// login user
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        // checking whether such a user exists
        const user = await User.findOne({where: {email}})


        if (user) { // if there is such a user, this block will work
            const areSame = await bcrypt.compare(password, user.password)
            if (areSame) { // if the passwords match, we register the tokens and send them to the frontend
                const token = jwt.sign({id: user.id}, keys.jwtSecret)
                res.send({candidate: user, token})
            } else { // if the Passwords don't match, this block will work
                res.send({msg: 'error'})
            }
        } else { // if there is no such user, this block will work
            res.send({msg: 'error'})
        }
    } catch (e) {
        res.send({msg: 'error'})
    }
};

// getting candidate
const getCandidate = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) { // if in the request has authorization header , this block will work
        const token = authHeader.split(' ')[1];
        // finding user with this token
        let candidate = jwt.verify(token, keys.jwtSecret)
        let user = await User.findOne({where: {id: candidate.id}})
        res.send(user)
    }
};

const changePassword = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const {oldPassword, password} = req.body;
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret)
        let user = await User.findOne({where: {id: candidate.id}})
        const areSame = await bcrypt.compare(oldPassword, user.password)
        if (areSame) {
            const hashPassword = await bcrypt.hash(password, 10)
            User.update({password: hashPassword}, {
                where: {id: user.id}
            })
                .then(num => {
                    if (num[0] === 1) {
                        res.send({msg: 'ok'})
                    } else {
                        res.send({msg: 'error'})
                    }
                })
                .catch(e => {
                    res.send({msg: 'error'})
                });
        }
    }
};

const deleteAccount = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const {password} = req.body;
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret)
        let user = await User.findOne({where: {id: candidate.id}})
        const areSame = await bcrypt.compare(password, user.password)
        if (areSame) {
            User.destroy({
                where: {id: user.id}
            })
                .then(num => {
                    if (num[0] === 1) {
                        res.send({msg: 'error'})
                    } else {
                        res.send({msg: 'ok'})
                    }
                })
                .catch(err => {
                    res.send({msg: 'error'})
                });
        }
    } else {
        res.send({msg: 'error'})
    }
};

const all_users = async (req, res) => {
    User.findAll()
        .then(data => {
            let users = JSON.stringify(data, null, 2)
            res.send({users: JSON.parse(users)})
        })
        .catch(e => {
            res.send({msg: e})
        });
};

const get_user = async (req, res) => {
    const {id} = req.query;

    User.findOne({
        where: {id},
        include: [
            Teacher_review,
            Teacher_education,
            Teacher_certificate,
            Teacher_work_experience,
            Teacher_language_of_instruction,
            TeacherAddress,
            Teacher_phone,
            Teacher_video,
            Free_hours
        ]
    })
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            res.send(e)
        })
};

module.exports = {register, login, getCandidate, changePassword, deleteAccount, all_users, get_user};