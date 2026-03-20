const UserService = require("../services/UserService");
const jwtService = require("../services/jwtService");

const getDetail = async (req, res) => {
  try {
    const response = await UserService.getDetail();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getDetail,
};
