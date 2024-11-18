//error-handler.js
const APIError = require('../errors/apierror')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  res.status(500).json({ message: 'There was an error!' })
}

module.exports = errorHandlerMiddleware
 