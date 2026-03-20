const express = require("express");
const router = express.Router();
const Controller = require("../controllers/AdminStatisicalController");

router.get("/categoryRankTable", Controller.categoryRankTable);
router.get("/productRankTable", Controller.productRankTable);
router.get("/userRankTable", Controller.userRankTable);
router.get("/mainRankTable", Controller.mainRankTable);
router.get("/orderRankTable", Controller.orderRankTable);
router.get("/supportUserTable", Controller.supportUserTable);

module.exports = router;
