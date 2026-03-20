const Service = require("../services/ProductService");

const createNew = async (req, res) => {
  try {
    const response = await Service.createNew(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const response = await Service.getDetail(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getMinPrice = async (req, res) => {
  try {
    const response = await Service.getMinPrice(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await Service.getAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllWithCaterogyID = async (req, res) => {
  try {
    const response = await Service.getAllWithCaterogyID(req.query.CategoryID);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getColor = async (req, res) => {
  try {
    const response = await Service.getColor(req.query.Product_Name);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getMemory = async (req, res) => {
  try {
    const response = await Service.getMemory(req.query.Product_Name);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const findIdProduct = async (req, res) => {
  try {
    const response = await Service.findIdProduct(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateObj = async (req, res) => {
  try {
    const response = await Service.updateObj(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteObj = async (req, res) => {
  try {
    const response = await Service.deleteObj(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createNew,
  getDetail,
  getAll,
  updateObj,
  deleteObj,
  getAllWithCaterogyID,
  getColor,
  getMemory,
  findIdProduct,
  getMinPrice,
};
