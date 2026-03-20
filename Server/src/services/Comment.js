const bcrypt = require("bcryptjs");
const db = require("../models/index");
const pool = require("../config/commectDBWithQuery");
const { Op } = require("@sequelize/core");

let createNew = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createNew = await db.Comant.create({
        Value: data.Value,
        UserID: data.UserID,
        ProductID: data.ProductID,
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

let getAll = async ({ ProductID }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Coment] = await pool.execute(
        `SELECT comants.*, users.User_Name FROM comants, users where comants.UserID = users.id and comants.ProductID=${ProductID}`
      );
      if (Coment) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: Coment,
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
  getAll,
};
