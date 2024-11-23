//error-handler.js
const APIError = require('../errors/apierror')
//const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  console.error(err.stack)
  res.status(500).json({ message: 'There was an error!' })
}

module.exports = errorHandlerMiddleware
