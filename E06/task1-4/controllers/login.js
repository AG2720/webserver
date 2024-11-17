//login.js in controllers

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { UnauthenticatedError, ValidationError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ValidationError('Email and password are required.');
    }

    const user = await User.findOne({ email })
    if (!user) {
      console.log('Login failed: user not found')
      throw new UnauthenticatedError('Invalid email or password')
    }
    
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      throw new UnauthenticatedError('Invalid email or password');
    }

    const userForToken = {
      id: user._id,
      email: user.email,
    }
    const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  
    res.status(StatusCodes.OK).json({ token, email: user.email })
  } catch (error) {
    next(error)
  }
}

module.exports = login
