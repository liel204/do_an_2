const UserService = require("../services/UserService");
const jwtService = require("../services/jwtService");

const checkEmail = async (req, res) => {
  try {
    console.log("checkEmail controller", req.body);
    const { User_Email } = req.body;
    console.log("checkEmail controller", User_Email);
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckUser_Email = reg.test(User_Email);
    if (!isCheckUser_Email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is User_Email",
      });
    }
    if (!User_Email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await UserService.checkEmail(req.body);
    return res.status(200).json(response);
  } catch (e) {
  console.error("checkEmail ERROR:", e);
  return res.status(500).json({
    status: "ERR",
    message: "Server error",
    error: e.message
  });
}

};

const createNewUser = async (req, res) => {
  try {
    const { User_Name, User_Email, User_Password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckUser_Email = reg.test(User_Email);
    if (!isCheckUser_Email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is User_Email",
      });
    }
    if (!User_Name || !User_Email || !User_Password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await UserService.createNewUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const response = await UserService.getDetail(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await UserService.getAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateObj = async (req, res) => {
  try {
    const response = await UserService.updateObj(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updatePass = async (req, res) => {
  try {
    const response = await UserService.updatePass(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteObj = async (req, res) => {
  try {
    const response = await UserService.deleteObj(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { User_Email, User_Password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckUser_Email = reg.test(User_Email);
    if (!User_Email || !User_Password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required" + User_Email + User_Password,
      });
    } else if (!isCheckUser_Email) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is User_Email",
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newReponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
      path: "/",
    });
    return res.status(200).json({ ...newReponse, refresh_token });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await jwtService.refreshToken(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createNewUser,
  getDetail,
  getAll,
  updateObj,
  deleteObj,
  loginUser,
  logoutUser,
  refreshToken,
  checkEmail,
  updatePass,
};
