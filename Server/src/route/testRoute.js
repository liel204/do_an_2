const express = require("express");
const router = express.Router();
const userController = require("../controllers/TestController");

router.get("/getDetail", userController.getDetail);

module.exports = router;
