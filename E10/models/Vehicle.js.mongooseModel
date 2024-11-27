const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  make: { 
    type: String,
    required : [true, 'Make required' ]

  },
  model: { 
    type: String,
    required : [true, 'Model required' ]

  },
  type: { 
    type: String,
    required: [true, 'Type required'] 
  },
  license_plate: { 
    type: String,
    validate: {
      validator: value => /^[A-ZÅÄÖ]{2,3}-[1-9]{1}[0-9]{0,2}$/.test(value),
      message: props => `${props.value} is not a valid license plate number!`
    },
    required: [true, 'License plate number required'],
    // Unique is NOT A VALIDATOR, creates an index with property UNIQUE if collection is empty
    unique: true
  }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
