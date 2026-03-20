"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }
  Product.init(
    {
      Product_Description: DataTypes.STRING,
      Product_Name: DataTypes.STRING,
      Product_Quantity: DataTypes.INTEGER,
      CategoryID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
