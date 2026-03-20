// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class CartItem extends Model {
//     static associate(models) {}
//   }
//   CartItem.init(
//     {
//       CartItem_Quantity: DataTypes.INTEGER,
//       ProductID: DataTypes.INTEGER,
//       UserID: DataTypes.INTEGER,
//       Status: DataTypes.STRING,
//       TotalPriceItem: DataTypes.FLOAT,
//       Image: DataTypes.STRING,
//       Color: DataTypes.STRING,
//       Memory: DataTypes.STRING,
//       PriceItem: DataTypes.FLOAT,
//     },
//     {
//       sequelize,
//       modelName: "CartItem",
//     }
//   );
//   return CartItem;
// };

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {}
  }
  CartItem.init(
    {
      CartItem_Quantity: DataTypes.INTEGER,
      ProductID: DataTypes.INTEGER,
      UserID: DataTypes.INTEGER,
      Status: DataTypes.STRING,
      TotalPriceItem: DataTypes.FLOAT,
      ColorID: DataTypes.INTEGER,
      MemoryID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
