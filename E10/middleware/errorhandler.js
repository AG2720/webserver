const { StatusCodes } = require('http-status-codes')

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
}

module.exports = errorHandler
