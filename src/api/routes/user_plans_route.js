const express = require("express");
const {
  buyPlanController,
  getUserPlanController,
} = require("../controllers/user_plan_controller");

const validateData = require("../middlewares/validate");
const verifyJWT = require("../middlewares/verify_jwt");
const router = express.Router();

// buy a plan
router.post("/buy", validateData, verifyJWT, buyPlanController);

// get current plan
router.get("/currentPlan/:user_id", verifyJWT, getUserPlanController);

module.exports = router;
