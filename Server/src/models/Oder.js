"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oder extends Model {
    static associate(models) {}
  }
  Oder.init(
    {
      Oder_TotalPrice: DataTypes.FLOAT,
      Oder_Status: DataTypes.STRING,
      Oder_AddressShipping: DataTypes.STRING,
      ShippingID: DataTypes.INTEGER,
      CartItemID: DataTypes.INTEGER,
      UserID: DataTypes.INTEGER,
      Payment: DataTypes.STRING,
      FullName: DataTypes.STRING,
      Phone: DataTypes.STRING,
      Note: DataTypes.STRING,
      app_trans_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Oder",
    }
  );
  return Oder;
};
