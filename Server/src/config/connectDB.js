const Sequelize = require("@sequelize/core");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "learn", 
  process.env.DB_USER || "root", 
  process.env.DB_PASSWORD || "123456", 
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
