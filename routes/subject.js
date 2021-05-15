const {Router} = require('express')
const router = Router()
const subjectController = require('../controllers/subject.controller')

router.get('/get_subject', subjectController.getSubject)

router.post('/create', subjectController.createSubject)

router.post('/delete_subject', subjectController.deleteSubject)

router.post('/update_subject', subjectController.updateSubject)

router.post('/create_sub_subject', subjectController.createSubSubject)

router.post('/delete_sub_subject', subjectController.deleteSubSubject)

router.post('/update_sub_subject', subjectController.updateSubSubject)

router.get('/get_single_subject', subjectController.getSingleSubject)

module.exports = router;