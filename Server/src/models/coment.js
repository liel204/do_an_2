"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comant extends Model {
    static associate(models) {}
  }
  Comant.init(
    {
      Value: DataTypes.STRING,
      UserID: DataTypes.INTEGER,
      ProductID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comant",
    }
  );
  return Comant;
};
