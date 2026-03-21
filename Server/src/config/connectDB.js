const Sequelize = require("@sequelize/core");
require("dotenv").config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "mysql",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(
      process.env.DB_NAME || "learn", 
      process.env.DB_USER || "root", 
      process.env.DB_PASSWORD || "123456", 
      {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,
        dialectOptions: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        } : {}
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
