//vehicles.js in controllers
const Vehicle = require('../models/Vehicle')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.status(StatusCodes.OK).json({ success: true, data: vehicles })
}

const createVehicle = async (req, res) => {
  const { userId, make, model, license_plate, commissioned } = req.body;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: 'No userId provided' });
  }

  // Validate that userId is a valid UUID and the user exists
  const user = await User.findByPk(userId);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: 'User not found' });
  }

  try {
    const type = Math.random() > 0.5 ? 'Van' : 'Passenger car';
    const vehicle = await Vehicle.create({
      make,
      model,
      type,
      license_plate,
      commissioned,
      userId, // Associate the vehicle with the user
    });

    res.status(StatusCodes.CREATED).json({ success: true, data: vehicle });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error.message });
  }
};

const getSingleVehicle = async (req, res) => {
  return res.status(StatusCodes.OK).json({ success: true, data: req.vehicle })   
}

const updateVehicle = async (req, res) => {
  req.vehicle.commissioned = !req.vehicle.commissioned
  await req.vehicle.save()
  res.status(StatusCodes.OK).json({ success: true, data: req.vehicle })   
}

const deleteVehicle = async (req, res) => {
  await req.vehicle.destroy()
  return res.status(StatusCodes.OK).json({ success: true })
}

module.exports = {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle
}
