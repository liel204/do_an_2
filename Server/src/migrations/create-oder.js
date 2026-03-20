"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Oders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Oder_TotalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      Oder_Status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Oder_AddressShipping: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ShippingID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      CartItemID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Payment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      FullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      app_trans_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Note: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Oders");
  },
};
