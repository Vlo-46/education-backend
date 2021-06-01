const {Router} = require('express')
const router = Router()
const profileController = require('../controllers/profile.controller')

//teacher
router.get('/teacher/get_teacher', profileController.getTeacher)

// router.post('/teacher/create_free_hours', profileController.createTeacherFreeHours)

router.post('/teacher/create_review', profileController.createTeacherReview)

router.post('/teacher/create_education', profileController.createTeacherEducation)
router.post('/teacher/delete_education', profileController.deleteTeacherEducation)

router.post('/teacher/create_certificates', profileController.createTeacherCertificates)
router.post('/teacher/delete_certificate', profileController.deleteTeacherCertificate)

router.post('/teacher/create_work_experience', profileController.createTeacherWorkExperience)
router.post('/teacher/delete_work_experience', profileController.deleteTeacherWorkExperience)

router.post('/teacher/create_language_of_instruction', profileController.createTeacherLanguageOfInstruction)
router.post('/teacher/update_language_of_instruction', profileController.updateTeacherLanguageOfInstruction)

router.post('/teacher/create_address', profileController.createTeacherAddress)
router.post('/teacher/update_address', profileController.updateTeacherAddress)

router.post('/teacher/create_phone', profileController.createTeacherPhone)
router.post('/teacher/delete_phone', profileController.deleteTeacherPhone)

router.post('/teacher/create_video', profileController.createTeacherVideo)
router.post('/teacher/delete_video', profileController.deleteTeacherVideo)

router.post('/teacher/send_request_to_teacher', profileController.sendRequestToTeacher)
router.post('/teacher/check_request', profileController.checkRequest)

router.get('/teacher/get_free_hours', profileController.getFreeHours)
router.post('/teacher/create_free_hours', profileController.createFreeHours)
router.post('/teacher/delete_free_hours', profileController.deleteFreeHours)

module.exports = router;