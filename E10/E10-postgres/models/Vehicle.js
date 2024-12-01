const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgres");

const Vehicle = sequelize.define(
  "vehicle",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    make: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    license_plate: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[A-ZÅÄÖ]{2,3}-[1-9]{1}[0-9]{0,2}$/,
      },
    },
    commissioned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

module.exports = Vehicle;
