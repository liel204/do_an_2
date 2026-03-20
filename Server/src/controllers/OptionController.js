const Service = require("../services/OptionService");

const addnewColor = async (req, res) => {
  try {
    const response = await Service.addnewColor(req);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const addnewRAM = async (req, res) => {
  try {
    const response = await Service.addnewRAM(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllMemory = async (req, res) => {
  try {
    const response = await Service.getAllMemory(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllColor = async (req, res) => {
  try {
    const response = await Service.getAllColor(req.query.productID);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getImageWithColor = async (req, res) => {
  try {
    const response = await Service.getImageWithColor(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getPriceWithMemory = async (req, res) => {
  try {
    const response = await Service.getPriceWithMemory(req.query);
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
    const response = await Service.deleteObj(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteColor = async (req, res) => {
  try {
    const response = await Service.deleteColor(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteRAM = async (req, res) => {
  try {
    const response = await Service.deleteRAM(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const detailColor = async (req, res) => {
  try {
    const response = await Service.detailColor(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const detailRAM = async (req, res) => {
  try {
    const response = await Service.detailRAM(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateColor = async (req, res) => {
  try {
    const response = await Service.updateColor(req);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateRAM = async (req, res) => {
  try {
    const response = await Service.updateRAM(req);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  addnewColor,
  getAllMemory,
  getAll,
  updateObj,
  deleteObj,
  getPriceWithMemory,
  getAllColor,
  getImageWithColor,
  addnewRAM,
  detailColor,
  deleteColor,
  updateColor,
  deleteRAM,
  detailRAM,
  updateRAM,
};
