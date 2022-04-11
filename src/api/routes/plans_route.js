const express = require("express");
const {
  getAllPlansController,
  getPlanByIdController,
  createPlanController,
} = require("../controllers/plans_controller");
const validateData = require("../middlewares/validate");
const router = express.Router();

const verifyJWT = require("../middlewares/verify_jwt");

// get all plans route
router.get("/", verifyJWT, getAllPlansController);

// get invoice plan by id route
router.get("/:plan_id", validateData, verifyJWT, getPlanByIdController);

// create invoice plan route
router.post("/create", validateData, verifyJWT, createPlanController);

module.exports = router;
