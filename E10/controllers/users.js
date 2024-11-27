const User = require('../models/User')
const Vehicle = require('../models/Vehicle')
const { StatusCodes } = require('http-status-codes')

const getUsers = async (req, res) => {
    const users = await User.findAll({
      attributes: {exclude : ['username']},
      include: {
        model: Vehicle,
        attributes: {exclude: ['userId']}
      }
    })
    res.status(StatusCodes.OK).json({ success: true, data: users })
  }

const createUser = async (req, res) => {
  const { username, name } = req.body
  if (!username || !name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: 'Username and name are required' })
  }
  const user = await User.create({ username, name })
  res. status(StatusCodes.CREATED).json({ success: true, data: user })
}

module.exports = { getUsers, createUser }


