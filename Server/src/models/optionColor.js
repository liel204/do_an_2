"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OptionColor extends Model {
    static associate(models) {}
  }
  OptionColor.init(
    {
      productID: DataTypes.INTEGER,
      color: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OptionColor",
    }
  );
  return OptionColor;
};
