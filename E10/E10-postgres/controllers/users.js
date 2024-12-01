const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const { StatusCodes } = require("http-status-codes");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Vehicle,
        attributes: { exclude: ["userId"] },
      },
    });
    res.status(StatusCodes.OK).json({ success: true, data: users });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Could not retrieve users",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username } = req.body;
    const user = await User.create({ name, username });
    res.status(StatusCodes.CREATED).json({ success: true, data: user });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
};
