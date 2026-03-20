const express = require("express");
const router = express.Router();
const Controller = require("../controllers/OptionController");
const upload = require("../middleware/uploadMiddleware");

router.post("/addnewRAM", Controller.addnewRAM);

router.get("/getAllMemory", Controller.getAllMemory);
router.get("/getPriceWithMemory", Controller.getPriceWithMemory);

router.get("/getAllColor", Controller.getAllColor);
router.get("/getImageWithColor", Controller.getImageWithColor);

router.put("/updateObj", Controller.updateObj);

router.delete("/deleteObj", Controller.deleteObj);
router.delete("/deleteColor", Controller.deleteColor);
router.delete("/deleteRAM", Controller.deleteRAM);

router.get("/detailColor", Controller.detailColor);
router.get("/detailRAM", Controller.detailRAM);

router.put("/updateColor", upload.single("image"), Controller.updateColor);
router.put("/updateRAM", Controller.updateRAM);
router.put("/addnewColor", upload.single("image"), Controller.addnewColor);

module.exports = router;
