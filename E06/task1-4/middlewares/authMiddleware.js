//authMiddleware.js

const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token in header')
    }
  
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        //req.user = decoded
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid or expired token')
    }
}

module.exports = authMiddleware
