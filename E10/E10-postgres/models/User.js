const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgres");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

module.exports = User;
