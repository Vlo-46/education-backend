const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const {registerValidators} = require('../utils/validators');
// const passport = require('passport');

router.post('/register', registerValidators, authController.register)

router.post('/login', authController.login)

router.get('/get_auth', authController.getCandidate)

router.post('/change_password', authController.changePassword)

router.post('/delete_account', authController.deleteAccount)

router.get('/all_users', authController.all_users)

router.get('/get_user', authController.get_user)


// router.get('/facebook', passport.authenticate('facebook', {
//     scope: ['public_profile', 'email']
// }));
//
// router.get('/facebook/callback',
//     passport.authenticate('facebook', {
//             // successRedirect: '/profile',
//             // failureRedirect: '/error'
//             successRedirect: '/profile',
//             failureRedirect: '/error'
//         }
//     ),
// );
//
// router.get('/logout', function (req, res) {
//     req.logout();
//     // res.redirect('/');
//     res.send('logout')
// });


module.exports = router;