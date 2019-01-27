const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/signin', userController.index)
router.post('/signin', userController.signin)
router.get('/signup', userController.create)
router.post('/signup', userController.store)
router.get('/signout', userController.signout)

module.exports = router