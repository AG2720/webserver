const mongoose = require('mongoose')

const licensePlateRegex = /^[A-Z]{3}-\d{3}$/

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    maxLength: 10,
  },
  model: String,
  type: {
    type: String,
    required: true
  },
  license_plate : {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return licensePlateRegex.test(v)
      },
      message: props => `${props.value} is not a valid Finnish license plate format!`
    }
  },
  mileage: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
})

vehicleSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update.status === 'inactive') {
    const vehicle = await this.model.findOne(this.getQuery());

    if (vehicle.status === 'active' && !update.mileage && vehicle.mileage === 0) {
      return next(new Error('Mileage must be recorded when changing status to inactive.'));
    }
  }
  next();
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
