const { StatusCodes } = require('http-status-codes')
const APIError = require('./apierror')

class UnauthenticatedError extends APIError {
  constructor(message = 'Authentication failed') {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedError
