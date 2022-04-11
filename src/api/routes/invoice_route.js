const express = require("express");
const { sendInvoiceController } = require("../controllers/invoice_controller");
const verifyJWT = require("../middlewares/verify_jwt");

const router = express.Router();

// get all plans route
router.post("/send", verifyJWT, sendInvoiceController);

module.exports = router;
