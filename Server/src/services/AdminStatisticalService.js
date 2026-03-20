const bcrypt = require("bcryptjs");
const db = require("../models/index");
const pool = require("../config/commectDBWithQuery");
const { Op } = require("@sequelize/core");

let categoryRankTable = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [categorys] = await pool.execute(
        `SELECT 
            c.Category_Name,
            YEAR(o.createdAt) AS Year,
            MONTH(o.createdAt) AS Month,
            SUM(o.Oder_TotalPrice) AS TotalPriceByCategory,
            COUNT(DISTINCT p.id) AS TotalProductCount
        FROM 
            oders o
        JOIN 
            cartitems ci ON o.CartItemID = ci.id
        JOIN 
            products p ON ci.ProductID = p.id
        JOIN 
            categories c ON p.CategoryID = c.id
        GROUP BY 
            c.Category_Name, YEAR(o.createdAt), MONTH(o.createdAt)
        ORDER BY 
            Year DESC, Month DESC, TotalPriceByCategory DESC;`
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

let productRankTable = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [items] = await pool.execute(
        `SELECT 
            p.Product_Name AS ProductName,
            c.Category_Name AS CategoryName,
            YEAR(o.createdAt) AS Year,
            MONTH(o.createdAt) AS Month,
            SUM(o.Oder_TotalPrice) AS TotalPriceByProduct
        FROM 
            oders o
        JOIN 
            cartitems ci ON o.CartItemID = ci.id
        JOIN 
            products p ON ci.ProductID = p.id
        JOIN 
            categories c ON p.CategoryID = c.id
        GROUP BY 
            p.Product_Name, c.Category_Name, YEAR(o.createdAt), MONTH(o.createdAt)
        ORDER BY 
            Year DESC, Month DESC, TotalPriceByProduct DESC;`
      );
      if (items) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: items,
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

let userRankTable = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [items] = await pool.execute(
        `SELECT 
            users.User_Name AS Name,
            users.User_Email AS Email,
            users.createdAt AS CreateUser,
            COALESCE(SUM(oders.Oder_TotalPrice), 0) AS Sum
        FROM 
            users
        LEFT JOIN 
            oders ON users.id = oders.UserID
        GROUP BY 
            users.id, users.User_Name, users.User_Email, users.createdAt;`
      );
      if (items) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: items,
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

let mainRankTable = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [items] = await pool.execute(
        `SELECT
            DATE(createdAt) AS Day, 
            MONTH(createdAt) AS Month, 
            YEAR(createdAt) AS Year, 
            Payment, 
            SUM(Oder_TotalPrice) AS Sum 
        FROM oders
        WHERE Oder_Status IN ('Paid Online', 'Order Delivered Successfully')
        GROUP BY
            DATE(createdAt), 
            MONTH(createdAt), 
            YEAR(createdAt), 
            Payment 
        ORDER BY
            Day DESC, Month DESC, Year DESC, Payment;`
      );
      if (items) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: items,
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

let orderRankTable = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [tmp] = await pool.execute(
        `SELECT products.Product_Name, cartitems.*, oders.* FROM products, cartitems, oders where cartitems.ProductID = products.id and oders.CartItemID = cartitems.id`
      );
      const fetchData = async () => {
        const promises = tmp.map(async (item) => {
          const [oders] = await pool.execute(
            `SELECT DISTINCT products.Product_Name, cartitems.*, oders.*, optioncolors.image, optioncolors.color, options.memory, options.option_price FROM options, products, cartitems, oders, optioncolors WHERE options.productID=products.id AND cartitems.ProductID = products.id AND oders.CartItemID = cartitems.id AND optioncolors.productID = products.id AND options.id=${item.MemoryID} AND optioncolors.id=${item.ColorID}`
          );
          return oders;
        });

        const results = await Promise.all(promises);
        return results.flat();
      };

      fetchData().then((data) => {
        const removeDuplicates = (data) => {
          return data.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
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
let supportUserTable = async ({ userId = null, paymentId = null }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [items] = await pool.execute(
        `SELECT DISTINCT
            users.id AS UserID,
            users.User_Name,
            users.User_Email,
            payments.id AS PaymentID,
            payments.Payment_Method,
            payments.Oder_TotalPrice,
            oders.Oder_Status,
            payments.createdAt AS Payment_CreatedAt
        FROM 
            users
        JOIN 
            payments ON users.id = payments.UserID
        JOIN 
            oders ON payments.id = oders.app_trans_id
        WHERE 
            (? IS NULL OR users.id = ?) AND 
            (? IS NULL OR payments.id = ?);`,
        [userId, userId, paymentId, paymentId]
      );
      if (items && items.length > 0) {
        resolve({
          status: "OK",
          message: "getAll successful",
          data: items,
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
  categoryRankTable,
  productRankTable,
  userRankTable,
  mainRankTable,
  orderRankTable,
  supportUserTable,
};
