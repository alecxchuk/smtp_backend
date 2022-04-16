const { getUserPlanDetail } = require("../../config/user_plans_db");
const { sendError, sendSuccess } = require("../helpers/response_handler");
const { planPurchaseSuccessful } = require("../helpers/response_messages");
const buyPlan = require("../services/buy_plan");

// controller for get wallet balance route
const buyPlanController = async (req, res) => {
  try {
    const { plan_id, user_id, wallet_id } = req.body;

    // purchased plan
    const plan = await buyPlan({ plan_id, user_id, wallet_id });

    const { plan_price, plan_name, validity, addon } = plan;
    // send success response
    sendSuccess(
      res,
      {
        plan_price,
        plan_name,
        validity,
        addon: addon === 0 ? false : true,
      },
      planPurchaseSuccessful
    );
  } catch (error) {
    sendError(res, error);
  }
};

// gets a user's current plan
const getUserPlanController = async (req, res) => {
  const { user_id } = req.params;
  try {
    // get user current plan
    const currentPlan = await getUserPlanDetail(user_id);
    sendSuccess(res, currentPlan);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = { buyPlanController, getUserPlanController };
