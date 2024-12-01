const Vehicle = require("./Vehicle");
const User = require("./User");

User.hasMany(Vehicle);
Vehicle.belongsTo(User);

module.exports = {
  Vehicle,
  User,
};
