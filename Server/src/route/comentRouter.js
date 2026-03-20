const express = require("express");
const router = express.Router();
const Controller = require("../controllers/comentControler");

router.post("/addnew", Controller.createNew);

router.get("/getAll", Controller.getAll);

// router.put("/updateObj", Controller.updateObj);

// router.delete("/deleteObj", Controller.deleteObj);

module.exports = router;
