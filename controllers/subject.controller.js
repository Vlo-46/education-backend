const db = require('../models');
const Subject = db.subject;
const SubSubject = db.subSubject;

const getSubject = async (req, res) => {
    Subject.findAll({include: SubSubject})
        .then(data => {
            let subjects = JSON.stringify(data, null, 2)
            res.send({subjects: JSON.parse(subjects)})
        })
        .catch(e => {
            res.send({msg: e})
        });
};

const createSubject = async (req, res) => {
    try {
        Subject.create({...req.body.subject})
            .then(data => {
                res.send(data)
            })
            .catch(e => res.send(e))
    } catch (e) {
        res.send(e)
    }
};

const deleteSubject = async (req, res) => {
    const {id} = req.body
    Subject.destroy({
        where: {id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({msg: 'error'})
            } else {
                res.send({msg: 'ok'})
            }
        })
        .catch(err => {
            res.send({msg: err})
        });
};

const updateSubject = async (req, res) => {
    Subject.update(req.body.subject, {
        where: {id: req.body.subject.id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({msg: 'ok', subject: req.body.subject})
            } else {
                res.send({msg: 'error'})
            }
        })
        .catch(e => {
            res.send({msg: e})
        });
};

const createSubSubject = async (req, res) => {
    try {
        SubSubject.create({...req.body.subSubject})
            .then(data => {
                res.send(data)
            })
            .catch(e => res.send(e))
    } catch (e) {
        res.send(e)
    }
};

const deleteSubSubject = async (req, res) => {
    const {id} = req.body
    SubSubject.destroy({
        where: {id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({msg: 'error'})
            } else {
                res.send({msg: 'ok'})
            }
        })
        .catch(err => {
            res.send({msg: err})
        });
};

const updateSubSubject = async (req, res) => {
    SubSubject.update(req.body.subSubject, {
        where: {id: req.body.subSubject.id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({msg: 'ok', subSubject: req.body.subSubject})
            } else {
                res.send({msg: 'error'})
            }
        })
        .catch(e => {
            res.send({msg: e})
        });
};

module.exports = {
    getSubject,
    createSubject,
    deleteSubject,
    updateSubject,
    createSubSubject,
    deleteSubSubject,
    updateSubSubject
};