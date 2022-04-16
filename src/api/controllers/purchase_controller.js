const { getPurchaseHistory } = require("../../config/purchase_db");
const { sendError, sendSuccess } = require("../helpers/response_handler");

const historyController = async (req, res) => {
  const { user_id } = req.params;
  console.log(req.params, 11);
  try {
    const history = await getPurchaseHistory(user_id);
    sendSuccess(res, history);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = { historyController };
