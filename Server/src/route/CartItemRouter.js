const express = require("express");
const router = express.Router();
const Controller = require("../controllers/CartItemController");

router.post("/addnew", Controller.createNew);

router.get("/getDetail", Controller.getDetail);
router.get("/getAll", Controller.getAll);
router.get("/getPrice", Controller.getPrice);

router.put("/updateObj", Controller.updateObj);
router.put("/updateStatusObj", Controller.updateStatusObj);

router.delete("/deleteObj", Controller.deleteObj);

module.exports = router;
