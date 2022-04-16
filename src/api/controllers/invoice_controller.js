const { sendError, sendSuccess } = require("../helpers/response_handler");
const sendInvoiceMessage = require("../services/send_invoice");
const formidable = require("formidable");
const { invoiceSentSuccess } = require("../helpers/response_messages");

// controller for get wallet balance route
const sendInvoiceController = async (req, res) => {
  try {
    const { user_id, filepath, mimetype, filename } = req;
    // send invoice message
    const sendInvoice = await sendInvoiceMessage({
      user_id,
      filepath,
      mimetype,
      filename,
    });

    // send success response
    sendSuccess(res, {}, invoiceSentSuccess);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = { sendInvoiceController };
