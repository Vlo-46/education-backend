const {Router} = require('express')
const router = Router()
const blogController = require('../controllers/blog.controller')

router.post('/create', blogController.create_blog)

router.get('/get_all', blogController.all_blogs)

router.get('/detail/:id', blogController.detail_blog)

router.post('/update', blogController.update_blog)

router.post('/delete_blog', blogController.delete_blog)

router.post('/create_comment', blogController.create_comment)

module.exports = router