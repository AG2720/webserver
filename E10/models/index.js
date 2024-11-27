//index.js in models
const Vehicle = require('./Vehicle')
const User = require('./User')

User.hasMany(Vehicle, { foreignKey: 'userId' })
Vehicle.belongsTo(User, { foreignKey: 'userId' })

module.exports = {
  Vehicle,
  User
}