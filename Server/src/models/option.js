"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    static associate(models) {}
  }
  Option.init(
    {
      productID: DataTypes.INTEGER,
      memory: DataTypes.STRING,
      option_price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Option",
    }
  );
  return Option;
};
