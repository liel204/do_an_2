// "use strict";
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable("CartItems", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       CartItem_Quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       ProductID: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       UserID: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       Status: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       PriceItem: {
//         type: Sequelize.FLOAT,
//         allowNull: false,
//       },
//       TotalPriceItem: {
//         type: Sequelize.FLOAT,
//         allowNull: false,
//       },
//       Memory: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       Image: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       Color: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable("CartItems");
//   },
// };

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CartItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CartItem_Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      TotalPriceItem: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      MemoryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ColorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CartItems");
  },
};
