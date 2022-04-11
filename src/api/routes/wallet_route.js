const express = require("express");
const {
  walletHistoryController,
  createWalletController,
  fundWalletController,
  getWalletsController,
  getWalletByIdController,
} = require("../controllers/wallet_controller");
const validateData = require("../middlewares/validate");
const verifyJWT = require("../middlewares/verify_jwt");
const router = express.Router();

// buy a plan from wallet
router.post("/create", validateData, createWalletController);

// fund the wallet plan
router.post("/fundWallet", validateData, verifyJWT, fundWalletController);

// get wallet route
router.get("/wallets", verifyJWT, getWalletsController);

router.get("/wallets/:user_id", verifyJWT, getWalletByIdController);

// buy a plan from wallet
// router.post("/buyPlan", validateData, verifyJWT, buyPlanController);

// show purchase history
router.get("/history", verifyJWT, walletHistoryController);

module.exports = router;
