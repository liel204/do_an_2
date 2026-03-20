const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { ganneralAccessToken, ganneralRefreshToken } = require("./jwtService");
const pool = require("../config/commectDBWithQuery");

let createNew = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra tính duy nhất của Product_Name
      const existingProduct = await db.Product.findOne({
        where: { Product_Name: data.Product_Name },
      });

      if (existingProduct) {
        return resolve({
          status: "FAIL",
          message: "Product_Name already exists",
        });
      }

      // Tạo sản phẩm mới nếu không trùng
      const createNew = await db.Product.create({
        Product_Name: data.Product_Name,
        Product_Description: data.Product_Description,
        Product_Quantity: data.Product_Quantity,
        CategoryID: data.CategoryID,
      });

      if (createNew) {
        resolve({
          status: "OK",
          message: "Create successful",
          data: createNew,
        });
      }
    } catch (e) {
      reject({
        status: "ERROR",
        message: "Something went wrong",
        error: e,
      });
    }
  });
};

let getDetail = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const product = await db.Product.findOne({
      //   where: { id: data },
      // });
      const [product] = await pool.execute(
        `SELECT products.*, categories.Category_Name FROM learn.products, categories  where categories.id=products.CategoryID and products.id=${data}`
      );
      if (product) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: product[0],
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

let getMinPrice = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [product] = await pool.execute(
        `select min(option_price) from options where productID = ${data}`
      );
      if (product) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: product,
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
      const [products] = await pool.execute(
        "SELECT products.*, categories.Category_Name, MIN(options.option_price) AS lowest_option_price, MAX(options.option_price) as Max FROM categories, products JOIN options ON products.id = options.productID WHERE products.CategoryID = categories.id GROUP BY products.id;"
      );
      if (products) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: products,
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

let getAllWithCaterogyID = async (CategoryID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [products] = await pool.execute(
        `SELECT products.*, MIN(options.option_price) AS lowest_option_price FROM products JOIN options ON products.id = options.productID WHERE products.CategoryID = ${CategoryID} GROUP BY products.id;`
      );
      if (products) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: products,
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

let getColor = async (Product_Name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [products] = await pool.execute(
        `select DISTINCT products.Product_Color from products where products.Product_Name = ${Product_Name}`
      );
      if (products) {
        resolve({
          status: "OK",
          message: "get successful",
          data: products,
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

let getMemory = async (Product_Name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [products] = await pool.execute(
        `select DISTINCT products.Product_Memory from products where products.Product_Name = ${Product_Name}`
      );
      if (products) {
        resolve({
          status: "OK",
          message: "get successful",
          data: products,
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

let findIdProduct = async ({ Product_Color, Product_Memory, Product_Name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [products] = await pool.execute(
        `select DISTINCT id from products where Product_Color="${Product_Color}" and Product_Memory="${Product_Memory}" and Product_Name="${Product_Name}";`
      );
      if (products) {
        resolve({
          status: "OK",
          message: "get successful",
          data: products,
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
      console.log("first", data);
      const product = await db.Product.findOne({
        where: { id: data.id },
      });

      if (product) {
        const existingProduct = await db.Product.findOne({
          where: {
            Product_Name: data.Product_Name,
            id: { [db.Sequelize.Op.ne]: data.id },
          },
        });

        if (existingProduct) {
          return resolve({
            status: "FAIL",
            message: "Product_Name already exists",
          });
        }

        product.Product_Description = data.Product_Description;
        product.Product_Name = data.Product_Name;
        product.CategoryID = data.CategoryID;
        await product.save();

        resolve({
          status: "OK",
          message: "Update successful",
          data: product,
        });
      } else {
        resolve({
          status: "FAIL",
          message: "Product not found",
        });
      }
    } catch (e) {
      reject({
        status: "ERROR",
        message: "Something went wrong",
        error: e,
      });
    }
  });
};

let deleteObj = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        where: { id: data.id },
      });
      if (product) {
        product.destroy();
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
  deleteObj,
  getAllWithCaterogyID,
  getMemory,
  getColor,
  findIdProduct,
  getMinPrice,
};
