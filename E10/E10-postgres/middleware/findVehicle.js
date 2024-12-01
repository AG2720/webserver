const Vehicle = require("../models/Vehicle");
const { StatusCodes } = require("http-status-codes");

const findVehicle = async (req, res, next) => {
  req.vehicle = await Vehicle.findByPk(req.params.id);
  if (!req.vehicle) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: `No vehicle found with id ${req.params.id}`,
    });
  }
  next();
};

module.exports = findVehicle;
