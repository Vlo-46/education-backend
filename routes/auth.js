const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const {registerValidators} = require('../utils/validators');

router.post('/register', registerValidators, authController.register)

router.post('/login', authController.login)

router.get('/get_auth', authController.getCandidate)

router.post('/change_password', authController.changePassword)

router.post('/delete_account', authController.deleteAccount)

router.get('/all_users', authController.all_users)

//testing
router.get('/get_user', authController.get_user)

module.exports = router;