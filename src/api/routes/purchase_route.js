const express = require("express");
const { historyController } = require("../controllers/purchase_controller");

const validateData = require("../middlewares/validate");
const verifyJWT = require("../middlewares/verify_jwt");
const router = express.Router();

// show purchase history
router.get(
  "/plans/history/:user_id",
  validateData,
  verifyJWT,
  historyController
);

module.exports = router;
