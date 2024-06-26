const jwt = require('jsonwebtoken')
const keys = require('../utils/keys')
const db = require('../models')
const User = db.users
const Free_hours = db.free_hours
const Notification = db.notification
const Teacher_review = db.teacher_review
const Teacher_education = db.teacher_education
const Teacher_certificate = db.teacher_certificate
const Teacher_work_experience = db.teacher_work_experience
const Teacher_language_of_instruction = db.teacher_language_of_instruction
const TeacherAddress = db.teacherAddress
const Teacher_phone = db.teacher_phone
const Teacher_video = db.teacher_video
const Free_times = db.free_times
const Lessons_hours = db.lessons_hours
const Teacher_student = db.teacher_student

const {Op} = require("sequelize");

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

// create teacher review
const createTeacherReview = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);

        const {teacher_id, review, rate} = req.body;

        Teacher_review.create({
            student_id: candidate.id,
            teacher_id,
            review,
            rate
        })
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.send(e)
            })

    }
}

// teacher reviews
const getTeacher = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        let id = candidate.id
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
                {
                    model: Teacher_student,
                    as: "teacher_students",
                },
                {
                    model: Teacher_student,
                    as: "student_teachers",
                },
                {
                    model: Notification,
                    as: "teacher_notification",
                    include: [
                        {
                            model: Lessons_hours,
                            where: {
                                [Op.or]: [
                                    {teacher_id: id},
                                    {student_id: id}
                                ]
                            }
                        }
                    ]
                },
                {
                    model: Notification,
                    as: "student_notification",
                    include: [
                        {
                            model: Lessons_hours,
                            where: {
                                [Op.or]: [
                                    {teacher_id: id},
                                    {student_id: id}
                                ]
                            }
                        }
                    ]
                },
                Free_hours,
            ],
        })
            .then(async data => {
                let studentIds = []
                let teacherIds = []

                if (data.role === 'student' && data.student_teachers.length) {
                    data.student_teachers.forEach(i => {
                        teacherIds.push(i.teacher_id)
                    })
                } else {
                    data.teacher_students.forEach(i => {
                        studentIds.push(i.student_id)
                    })
                }

                const friends = await User.findAll({
                    where: {
                        id: teacherIds.length ? teacherIds : studentIds
                    }
                })

                res.send({user: data, friends})
                // res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }
}


// teacher education
// create
const createTeacherEducation = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        const {university, start_date, end_date, education} = req.body;

        Teacher_education.create({
            teacher_id: candidate.id,
            university,
            start_date,
            end_date,
            education
        })
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }
}

// delete
const deleteTeacherEducation = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {id} = req.body;
            Teacher_education.destroy({
                where: {id: id}
            })
                .then(num => {
                    if (num[0] === 1) {
                        res.send({msg: 'error'})
                    } else {
                        res.send({msg: 'ok'})
                    }
                })
                .catch(err => {
                    res.send({msg: 'catch'})
                });
        }
    }
}

// teacher certificates
// create
const createTeacherCertificates = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);

        const {certificate} = req.body;

        Teacher_certificate.create({
            teacher_id: candidate.id,
            certificate
        })
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }
}

// delete
const deleteTeacherCertificate = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {id} = req.body;
            Teacher_certificate.destroy({
                where: {id: id}
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
        }
    }
}

// teacher work experience
// create
const createTeacherWorkExperience = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        const {company, profession, start_date, end_date} = req.body;

        Teacher_work_experience.create({
            teacher_id: candidate.id,
            company,
            profession,
            start_date,
            end_date
        })
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }
}

// delete
const deleteTeacherWorkExperience = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {id} = req.body;
            Teacher_work_experience.destroy({
                where: {id: id}
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
        }
    }
}

// teacher language of instruction
//create
const createTeacherLanguageOfInstruction = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        const {language} = req.body;
        Teacher_language_of_instruction.create({
            teacher_id: candidate.id,
            language
        })
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }
}

// update
const updateTeacherLanguageOfInstruction = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {language, id} = req.body;
            Teacher_language_of_instruction.update(req.body, {
                where: {id: id}
            })
                .then(num => {
                    if (num[0] === 1) {
                        res.send({msg: 'ok'})
                    } else {
                        res.send({msg: 'error'})
                    }
                })
                .catch(e => {
                    res.send({msg: e})
                });
        }
    }
}

// teacher address
// create
const createTeacherAddress = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {address} = req.body;
            TeacherAddress.create({
                teacher_id: candidate.id,
                address
            })
                .then(data => {
                    res.send(data)
                })
                .catch(e => {
                    res.send(e)
                })
        }
    }
}

// update
const updateTeacherAddress = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {address, id} = req.body;
            TeacherAddress.update(req.body, {
                where: {id: id}
            })
                .then(num => {
                    if (num[0] === 1) {
                        res.send({msg: 'ok'})
                    } else {
                        res.send({msg: 'error'})
                    }
                })
                .catch(e => {
                    res.send({msg: e})
                });
        }
    }
}

// teacher phone
// create
const createTeacherPhone = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        const {phone} = req.body;
        Teacher_phone.create({
            teacher_id: candidate.id,
            phone
        })
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }
}

// delete
const deleteTeacherPhone = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {id} = req.body;
            Teacher_phone.destroy({
                where: {id: id}
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
        }
    }
}

// teacher video
// create
const createTeacherVideo = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        const {video} = req.body;
        Teacher_video.create({
            teacher_id: candidate.id,
            video
        })
            .then(data => {
                res.send(data)
            })
            .catch(e => {
                res.send(e)
            })
    }
}

// delete
const deleteTeacherVideo = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {id} = req.body;
            Teacher_video.destroy({
                where: {id: id}
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
        }
    }
}

// teacher students
// send a request to the teacher
const sendRequestToTeacher = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        let user = await User.findOne({where: {id: candidate.id}})
        if (user.role === 'student') {
            const {teacher_id} = req.body;
            Notification.create({
                teacher_id,
                student_id: user.id,
                status: 'during'
            })
                .then(data => {
                    res.send(data)
                })
                .catch(e => {
                    res.send({msg: e})
                })
        } else {
            res.send({msg: 'error'})
        }
    }
}

// check request
const checkRequest = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            const {notification_id, status} = req.body;
            Notification.update({status, seen: true}, {
                where: {id: notification_id}
            })
                .then(num => {
                    if (num[0] === 1) {
                        res.send({msg: 'ok'})
                    } else {
                        res.send({msg: 'error'})
                    }
                })
                .catch(e => {
                    res.send(e)
                })
        }
    }
}

// teacher free times
// get teacher free hours
const getFreeHours = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            Free_hours.findAll({
                where: {teacher_id: candidate.id}
            })
                .then(data => {
                    let free_hours = {}
                    data.forEach(f => {
                        if (f.weekday in free_hours) {
                            free_hours[f.weekday].push(f);
                        } else {
                            free_hours[f.weekday] = [];
                            free_hours[f.weekday].push(f);
                        }
                    })
                    res.send(free_hours)
                })
                .catch(e => {
                    res.send({msg: 'error', err: e})
                })
        }
    }
}

// create teacher free hours
const createFreeHours = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            Free_hours.create({
                teacher_id: candidate.id,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                weekday: req.body.weekday,
                free: true
            })
                .then(data => {
                    res.send(data)
                })
                .catch(e => {
                    res.send({msg: 'error', err: e})
                })
        } else {
            res.send({msg: "invalid token"})
        }
    }
}

// delete teacher free hours

const deleteFreeHours = async (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let candidate = jwt.verify(token, keys.jwtSecret);
        if (candidate) {
            Free_hours.destroy({
                where: {id: req.body.id}
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
    }
}

module.exports = {
    createTeacherFreeHours,
    createTeacherReview,
    getTeacher,
    createTeacherEducation,
    deleteTeacherEducation,
    createTeacherCertificates,
    deleteTeacherCertificate,
    createTeacherWorkExperience,
    deleteTeacherWorkExperience,
    createTeacherLanguageOfInstruction,
    updateTeacherLanguageOfInstruction,
    createTeacherAddress,
    updateTeacherAddress,
    createTeacherPhone,
    deleteTeacherPhone,
    createTeacherVideo,
    deleteTeacherVideo,
    sendRequestToTeacher,
    checkRequest,
    getFreeHours,
    createFreeHours,
    deleteFreeHours,
}