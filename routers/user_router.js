const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

// create user
router.post('/createNewUser', userController.register)

// login
router.post('/signInUser', userController.login)

// logout
router.get('/userSignOut', userController.logout)

module.exports = router