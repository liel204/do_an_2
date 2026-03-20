const express = require("express");
const router = express.Router();
const Controller = require("../controllers/ProductController");

router.post("/addnew", Controller.createNew);

router.get("/getDetail", Controller.getDetail);
router.get("/getAll", Controller.getAll);
router.get("/getAllWithCaterogyID", Controller.getAllWithCaterogyID);
router.get("/getMinPrice", Controller.getMinPrice);

router.get("/getColor", Controller.getColor);
router.get("/getMemory", Controller.getMemory);

router.get("/findIdProduct", Controller.findIdProduct);

router.put("/updateObj", Controller.updateObj);

router.delete("/deleteObj", Controller.deleteObj);

module.exports = router;
