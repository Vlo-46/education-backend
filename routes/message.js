const {Router} = require('express')
const router = Router()
const messageController = require('../controllers/message.controller')

router.post('/send', messageController.SEND_MESSAGE)

module.exports = router;