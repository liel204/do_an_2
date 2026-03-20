const Service = require("../services/OderService");

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

const getAll = async (req, res) => {
  try {
    const response = await Service.getAll(req.query.UserID);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getSumForPayment = async (req, res) => {
  try {
    const response = await Service.getSumForPayment(req.body);
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
  getSumForPayment,
};
