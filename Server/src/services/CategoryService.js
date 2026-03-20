const bcrypt = require("bcryptjs");
const db = require("../models/index");
const pool = require("../config/commectDBWithQuery");
const { Op } = require("@sequelize/core");

let createNew = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra tính duy nhất của Category_Name
      const existingCategory = await db.Category.findOne({
        where: { Category_Name: data.Category_Name },
      });

      if (existingCategory) {
        return resolve({
          status: "FAIL",
          message: "Category_Name already exists",
        });
      }

      // Tạo danh mục mới nếu không trùng
      const createNew = await db.Category.create({
        Category_Name: data.Category_Name,
      });

      if (createNew) {
        resolve({
          status: "OK",
          message: "Create successful",
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
      const category = await db.Category.findOne({
        where: { id: data },
      });
      if (category) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: category,
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
      const [categorys] = await pool.execute(
        `SELECT categories.*, COUNT(products.id) AS product_count FROM learn.categories LEFT JOIN learn.products ON categories.id = products.CategoryID GROUP BY categories.id`
      );
      if (categorys) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: categorys,
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
      const category = await db.Category.findOne({
        where: { id: data.id },
      });

      if (category) {
        const existingCategory = await db.Category.findOne({
          where: {
            Category_Name: data.Category_Name,
            id: { [db.Sequelize.Op.ne]: data.id },
          },
        });

        if (existingCategory) {
          return resolve({
            status: "FAIL",
            message: "Category_Name already exists",
          });
        }

        category.Category_Name = data.Category_Name;
        await category.save();

        resolve({
          status: "OK",
          message: "Update successful",
          data: category,
        });
      } else {
        resolve({
          status: "FAIL",
          message: "Category not found",
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
      const category = await db.Category.findOne({
        where: { id: data.id },
      });
      if (category) {
        category.destroy();
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
};
