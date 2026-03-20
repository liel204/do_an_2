const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { ganneralAccessToken, ganneralRefreshToken } = require("./jwtService");
const pool = require("../config/commectDBWithQuery");
const { Op } = require("@sequelize/core");

let addnewColor = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createNew = await db.OptionColor.create({
        productID: data.body.productID,
        color: data.body.color,
        image: data.file.path.slice("../client/public".length),
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

let addnewRAM = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createNew = await db.Option.create({
        productID: data.productID,
        memory: data.memory,
        option_price: data.option_price,
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

let getPriceWithMemory = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Option] = await pool.execute(
        `select * from options where id=${id}`
      );
      if (Option.length !== 0) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: Option,
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

let getImageWithColor = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Option] = await pool.execute(
        `select * from optioncolors where id=${id}`
      );
      if (Option.length !== 0) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: Option,
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

let getAllMemory = async (productID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Option] = await pool.execute(
        `select * from options where productID=${productID}`
      );
      if (Option.length !== 0) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: Option,
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

let getAllColor = async (productID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Option] = await pool.execute(
        `select * from optioncolors where productID=${productID}`
      );
      if (Option.length !== 0) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: Option,
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

let getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [cartItems] = await pool.execute(
        "SELECT products.Product_Image, products.Product_Name, products.Product_Price, cartitems.* FROM products, cartitems where cartitems.ProductID = products.id;"
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
      const product = await db.Product.findOne({
        where: { id: cartItem.ProductID },
      });
      if (cartItem) {
        cartItem.CartItem_Quantity = data.CartItem_Quantity;
        cartItem.PriceItem = data.CartItem_Quantity * product.Product_Price;
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

let deleteColor = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Color = await db.OptionColor.findOne({
        where: { id: data.id },
      });
      if (Color) {
        Color.destroy();
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

let deleteRAM = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const RAM = await db.Option.findOne({
        where: { id: data.id },
      });
      if (RAM) {
        RAM.destroy();
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

let detailColor = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Option] = await pool.execute(
        `select * from optioncolors where id=${id} `
      );
      if (Option.length !== 0) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: Option,
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

let detailRAM = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Option] = await pool.execute(
        `select * from options where id=${id} `
      );
      if (Option.length !== 0) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: Option,
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

let updateColor = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const OptionColor = await db.OptionColor.findOne({
        where: { id: data.body.id },
        raw: false,
      });
      if (OptionColor) {
        OptionColor.color = data.body.color;
        (OptionColor.image = data.file.path.slice("../client/public".length)),
          await OptionColor.save();
        resolve({
          status: "OK",
          message: "update successful",
          data: OptionColor,
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

let updateRAM = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const OptionRAM = await db.Option.findOne({
        where: { id: data.body.id },
        raw: false,
      });
      if (OptionRAM) {
        OptionRAM.memory = data.body.memory;
        OptionRAM.option_price = data.body.option_price;
        await OptionRAM.save();
        resolve({
          status: "OK",
          message: "update successful",
          data: OptionRAM,
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
module.exports = {
  addnewColor,
  getPriceWithMemory,
  getAll,
  updateObj,
  updateStatusObj,
  deleteObj,
  getAllMemory,
  getImageWithColor,
  getAllColor,
  addnewRAM,
  deleteColor,
  detailColor,
  updateColor,
  deleteRAM,
  detailRAM,
  updateRAM,
};
