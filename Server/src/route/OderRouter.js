const express = require("express");
const router = express.Router();
const Controller = require("../controllers/OderController");

router.post("/addnew", Controller.createNew);

router.get("/getDetail", Controller.getDetail);
router.get("/getAll", Controller.getAll);
router.post("/getSumForPayment", Controller.getSumForPayment);

router.put("/updateObj", Controller.updateObj);

router.delete("/deleteObj", Controller.deleteObj);

module.exports = router;
