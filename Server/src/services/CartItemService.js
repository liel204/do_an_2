const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { ganneralAccessToken, ganneralRefreshToken } = require("./jwtService");
const pool = require("../config/commectDBWithQuery");
const { Op } = require("@sequelize/core");

// let createNew = async (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const createNew = await db.CartItem.create({
//         Image: data.Image,
//         Color: data.Color,
//         Memory: data.Memory,
//         CartItem_Quantity: data.CartItem_Quantity,
//         ProductID: data.ProductID,
//         UserID: data.UserID,
//         Status: "Yes",
//         PriceItem: data.price,
//         TotalPriceItem: data.price * data.CartItem_Quantity,
//       });
//       if (createNew) {
//         resolve({
//           status: "OK",
//           message: "Create successful",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let createNew = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [price] = await pool.execute(
        `SELECT option_price FROM options where id=${data.MemoryID}`
      );

      const createNew = await db.CartItem.create({
        ColorID: data.ColorID,
        MemoryID: data.MemoryID,
        CartItem_Quantity: data.CartItem_Quantity,
        ProductID: data.ProductID,
        UserID: data.UserID,
        Status: "Yes",
        TotalPriceItem: price[0].option_price * data.CartItem_Quantity,
      });
      if (createNew) {
        resolve({
          status: "OK",
          message: "Create successful",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetail = async (CartItemID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [cartItem] = await pool.execute(
        `SELECT products.Product_Name,  cartitems.* FROM products, cartitems where cartitems.ProductID = products.id and cartitems.id=${CartItemID}`
      );
      if (cartItem.length !== 0) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: cartItem,
        });
      } else {
        resolve({
          status: "OK",
          message: "Empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAll = async (UserID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [cartItems] = await pool.execute(
        `SELECT products.Product_Name, cartitems.*, optioncolors.*, options.*, cartitems.id FROM options, optioncolors, products, cartitems where cartitems.ProductID = products.id and cartitems.MemoryID = options.id and cartitems.ColorID = optioncolors.id and UserID=${UserID}`
      );

      if (cartItems) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: cartItems,
        });
      } else {
        resolve({
          status: "OK",
          message: "Empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getPrice = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [cartItems] = await pool.execute(
        `SELECT TotalPriceItem FROM learn.cartitems where id=${id}`
      );

      if (cartItems) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: cartItems,
        });
      } else {
        resolve({
          status: "OK",
          message: "Empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateObj = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cartItem = await db.CartItem.findOne({
        where: { id: data.id },
        raw: false,
      });

      const [price] = await pool.execute(
        `SELECT option_price FROM options where id=${cartItem.MemoryID}`
      );

      if (cartItem) {
        cartItem.CartItem_Quantity = data.CartItem_Quantity;
        cartItem.TotalPriceItem =
          price[0].option_price * data.CartItem_Quantity;
        await cartItem.save();
        resolve({
          status: "OK",
          message: "update successful",
          data: cartItem,
        });
      } else {
        resolve({
          status: "OK",
          message: "Empty",
        });
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let updateStatusObj = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cartItem = await db.CartItem.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (cartItem) {
        if (cartItem.Status === "Yes") {
          cartItem.Status = "No";
        } else {
          cartItem.Status = "Yes";
        }
        await cartItem.save();
        resolve({
          status: "OK",
          message: "update successful",
          data: cartItem,
        });
      } else {
        resolve({
          status: "OK",
          message: "Empty",
        });
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let deleteObj = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cartItem = await db.CartItem.findOne({
        where: { id: data.id },
      });
      if (cartItem) {
        cartItem.destroy();
        resolve({
          status: "OK",
          message: "delete successful",
        });
      } else {
        resolve({
          status: "OK",
          message: "Empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNew,
  getDetail,
  getAll,
  updateObj,
  updateStatusObj,
  deleteObj,
  getPrice,
};
