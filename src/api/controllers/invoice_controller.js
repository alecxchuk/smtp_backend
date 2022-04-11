const { sendError, sendSuccess } = require("../helpers/response_handler");

// controller for get wallet balance route
const sendInvoiceController = (req, res) => {
  try {
    // send success response
    sendSuccess(res, {});
  } catch (error) {
    sendError(error);
  }
};

module.exports = { sendInvoiceController };
