const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/addnew", userController.createNewUser);
router.post("/checkEmail", userController.checkEmail);

router.get("/getDetail", userController.getDetail);
router.get("/getAll", userController.getAll);

router.put("/updateObj", userController.updateObj);
router.put("/updatePass", userController.updatePass);

router.delete("/deleteObj", userController.deleteObj);

router.post("/loginUser", userController.loginUser);
router.post("/logoutUser", userController.logoutUser);
router.post("/refreshToken", userController.refreshToken);

module.exports = router;
