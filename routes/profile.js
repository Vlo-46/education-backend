const {Router} = require('express')
const router = Router()
const profileController = require('../controllers/profile.controller')

//teacher
router.post('/teacher/create_free_hours', profileController.createTeacherFreeHours)

module.exports = router;