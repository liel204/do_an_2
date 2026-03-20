const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { ganneralAccessToken, ganneralRefreshToken } = require("./jwtService");
const pool = require("../config/commectDBWithQuery");
const { Op } = require("@sequelize/core");
const { DATE } = require("sequelize");

let createNew = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createNew = await db.Oder.create({
        Oder_TotalPrice: data.Oder_TotalPrice,
        Oder_Status: data.Oder_Status,
        Oder_AddressShipping: data.Oder_AddressShipping,
        ShippingID: 1,
        CartItemID: data.CartItemID,
        UserID: data.UserID,
        Payment: data.Payment,
        FullName: data.FullName,
        Phone: data.Phone,
        Note: data.Note,
        app_trans_id: data.app_trans_id,
      });
      if (createNew) {
        resolve({
          status: "OK",
          message: "Create successful",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetail = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oder = await db.Oder.findOne({
        where: { id: data },
      });
      if (oder) {
        resolve({
          status: "OK",
          message: "getDetail successful",
          data: oder,
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
      const [tmp] = await pool.execute(
        `SELECT products.Product_Name, cartitems.*, oders.* FROM products, cartitems, oders where cartitems.ProductID = products.id and oders.CartItemID = cartitems.id and oders.UserID=${UserID};`
      );
      const fetchData = async () => {
        const promises = tmp.map(async (item) => {
          const [oders] = await pool.execute(
            `SELECT DISTINCT products.Product_Name, cartitems.*, oders.*, optioncolors.image, optioncolors.color, options.memory, options.option_price FROM options, products, cartitems, oders, optioncolors WHERE options.productID=products.id AND cartitems.ProductID = products.id AND oders.CartItemID = cartitems.id AND optioncolors.productID = products.id AND options.id=${item.MemoryID} AND optioncolors.id=${item.ColorID} AND oders.UserID=${UserID}`
          );
          return oders; // Trả về kết quả cho từng phần tử
        });

        const results = await Promise.all(promises); // Chờ tất cả các promise hoàn tất
        return results.flat(); // Gộp tất cả các mảng lại thành một mảng duy nhất
      };

      // Sử dụng `fetchData`
      fetchData().then((data) => {
        const removeDuplicates = (data) => {
          return data.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.id === item.id // Compare based on app_trans_id
              )
          );
        };
        const uniqueData = removeDuplicates(data);
        if (data) {
          resolve({
            status: "OK",
            message: "getAll successful",
            data: uniqueData,
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getSumForPayment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [oders] = await pool.execute(
        `select sum(Oder_TotalPrice) as sum from oders where app_trans_id='${data.app_trans_id}'`
      );
      if (oders) {
        resolve({
          status: "OK",
          message: " successful",
          data: oders,
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
      const oder = await db.Oder.findOne({
        where: { id: data.id },
      });

      if (oder) {
        oder.Oder_Status = data.Oder_Status;
        oder.save();
        resolve({
          status: "OK",
          message: "update successful",
          data: oder,
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
      const oder = await db.Oder.findOne({
        where: { id: data.id },
      });
      if (oder) {
        oder.destroy();
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
  getSumForPayment,
};
