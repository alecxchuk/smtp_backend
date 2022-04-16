const express = require("express");
const { sendInvoiceController } = require("../controllers/invoice_controller");
const formData = require("../middlewares/form_data");
const verifyJWT = require("../middlewares/verify_jwt");

const router = express.Router();

// get all plans route
router.post("/send", verifyJWT, formData, sendInvoiceController);

module.exports = router;
