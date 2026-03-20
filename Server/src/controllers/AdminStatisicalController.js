const Service = require("../services/AdminStatisticalService");

const categoryRankTable = async (req, res) => {
  try {
    const response = await Service.categoryRankTable();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const productRankTable = async (req, res) => {
  try {
    const response = await Service.productRankTable();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const userRankTable = async (req, res) => {
  try {
    const response = await Service.userRankTable();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const mainRankTable = async (req, res) => {
  try {
    const response = await Service.mainRankTable();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const orderRankTable = async (req, res) => {
  try {
    const response = await Service.orderRankTable();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const supportUserTable = async (req, res) => {
  try {
    const response = await Service.supportUserTable(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  categoryRankTable,
  productRankTable,
  userRankTable,
  mainRankTable,
  orderRankTable,
  supportUserTable,
};
