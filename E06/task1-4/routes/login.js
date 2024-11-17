//login.js in routes
const express = require('express')
const router = express.Router()

const login = require('../controllers/login')

// Login post route, pass in the login controller
router.route('/').post(login)

module.exports = router
 