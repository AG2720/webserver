//register.js in controllers

const User = require('../models/User')
const { ValidationError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res, next) => {
    try {
        const { name, email, password, passwordConfirmation } = req.body

        if (!name || !email || !password || !passwordConfirmation) {
            throw new ValidationError('All fields are required: name, email, password, passwordConfiramtion')
        }

        if (password !== passwordConfirmation) {
            throw new ValidationError('Passwords do not match')
        } 

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new ValidationError('Email already exists')
        }

        const user = new User({ name, email, password })
        await user.save()

        res.status(StatusCodes.CREATED).json({ success: true, msg: 'User registered successfully', user: { name, email } })
    } catch (error) {
        next(error)
    }
}

module.exports = register