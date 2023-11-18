const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const categoryController = require('../../controllers/dashboard/categoryController')

router.post('/category-add',  categoryController.add_category)
router.get('/category-get',  categoryController.get_category)

module.exports = router