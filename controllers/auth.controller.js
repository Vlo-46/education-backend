const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const keys = require('../utils/keys');

const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.send({msg: 'error', errors})
    } else {
        const {name, surname, email, password, confirm, phone, role} = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({where: {email}});
        if (user) {
            res.send({msg: 'Այդպիսի օգտատեր արդեն գոյություն ունի'})
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
                        const token = jwt.sign({id: data.id}, keys.jwtSecret)
                        res.send({data, token})
                    })
                    .catch(e => {
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
                        const token = jwt.sign({id: data.id}, keys.jwtSecret)
                        res.send({data, token})
                    })
                    .catch(e => {
                        res.send({msg: e})
                    })
            }
        }
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})

        if (user) {
            const areSame = await bcrypt.compare(password, user.password)
            if (areSame) {
                const token = jwt.sign({id: user.id}, keys.jwtSecret)
                res.send({candidate: user, token})
            } else {
                res.send({msg: 'error'})
            }
        } else {
            res.send({msg: 'error'})
        }
    } catch (e) {
        res.send({msg: 'error'})
    }
};

const getCandidate = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
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
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const {id} = req.query;
        let user = await User.findOne({where: {id}})
        res.send(user)
    }
};

module.exports = {register, login, getCandidate, changePassword, deleteAccount, all_users, get_user};