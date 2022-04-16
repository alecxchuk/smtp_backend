const express = require("express");
const router = express.Router();

const authRoutes = require("./auth_route");
const walletRoutes = require("./wallet_route");
const plansRoute = require("./plans_route");
const invoiceRoutes = require("./invoice_route");
const purchaseRoutes = require("./purchase_route");
const userPlansRoutes = require("./user_plans_route");
// const userRoutes = require("./user_route");

// Authentication routes
router.use("/auth", authRoutes);
// wallet route
router.use("/wallet", walletRoutes);
//
router.use("/plans", plansRoute);
router.use("/invoice", invoiceRoutes);
router.use("/store", purchaseRoutes);
router.use("/plans", userPlansRoutes);

module.exports = router;
