const { StatusCodes } = require('http-status-codes')
const APIError = require('./apierror')

class ValidationError extends APIError {
    constructor(message = 'Validation failed') {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}


module.exports = ValidationError