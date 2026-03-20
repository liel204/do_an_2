const express = require("express");
const router = express.Router();
const Controller = require("../controllers/CategoryController");
const middleWare = require("../middleware/AuthMiddleware");

router.post(
  "/addnew",
  middleWare.AuthMiddleWareAdminRole,
  Controller.createNew
);

router.get("/getDetail", Controller.getDetail);
router.get("/getAll", Controller.getAll);

router.put(
  "/updateObj",
  middleWare.AuthMiddleWareAdminRole,
  Controller.updateObj
);

router.delete(
  "/deleteObj",
  middleWare.AuthMiddleWareAdminRole,
  Controller.deleteObj
);

module.exports = router;
