const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { ganneralAccessToken, ganneralRefreshToken } = require("./jwtService");
const pool = require("../config/commectDBWithQuery");
const { Op } = require("@sequelize/core");

var salt = bcrypt.genSaltSync(10);

let checkEmail = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await db.User.findOne({
        where: { User_Email: data.User_Email },
      });
      if (checkEmail) {
        resolve({
          status: "ERR",
          message: "Email already exists",
        });
      }
      resolve({
        status: "OK",
        message: "Email no already exists",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await db.User.findOne({
        where: { User_Email: data.User_Email },
      });
      if (checkEmail) {
        resolve({
          status: "ERR",
          message: "Email already exists",
        });
      } else {
        let hashPassword = await hashUserPassWord(data.User_Password);
        const createNewUser = await db.User.create({
          User_Name: data.User_Name,
          User_Email: data.User_Email,
          User_Password: hashPassword,
          User_Role: "Client",
        });
        if (createNewUser) {
          resolve({
            status: "OK",
            message: "Create user successful",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetail = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data },
      });
      if (user) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: user,
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
      const [users] = await pool.execute(
        "SELECT users.*, SUM(oders.Oder_TotalPrice) AS total_order_value FROM users LEFT JOIN oders ON users.id = oders.UserID GROUP BY users.id;"
      );
      if (users) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: users,
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
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.User_Role = data.User_Role;

        user.save();
        resolve({
          status: "OK",
          message: "update successful",
          data: user,
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

let updatePass = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { User_Email: data.User_Email },
      });
      if (user) {
        let hashPassword = await hashUserPassWord(data.User_Password);
        user.User_Password = hashPassword;
        user.save();
        resolve({
          status: "OK",
          message: "update successful",
          data: user,
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

let deleteObj = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.destroy();
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

const loginUser = (UserLogin) => {
  return new Promise(async (resolve, reject) => {
    const { User_Email, User_Password } = UserLogin;
    try {
      const checkUser = await db.User.findOne({
        where: { User_Email: User_Email },
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(
        User_Password,
        checkUser.User_Password
      );
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await ganneralAccessToken({
        id: checkUser.id,
        User_Role: checkUser.User_Role,
      });
      const refresh_token = await ganneralRefreshToken({
        id: checkUser.id,
        User_Role: checkUser.User_Role,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  getDetail,
  getAll,
  updateObj,
  deleteObj,
  loginUser,
  checkEmail,
  updatePass,
};