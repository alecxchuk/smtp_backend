const { findPlanByPlanId } = require("../../config/plan_db");
const {
  createPurchase,
  updatePurchaseStatus,
} = require("../../config/purchase_db");
const {
  updateUserPlan,
  addUserPlan,
  getUserPlanDetail,
} = require("../../config/user_plans_db");
const {
  findWalletByWalletId,
  updateWallet,
} = require("../../config/wallet_db");
const CalculateValidityDate = require("../helpers/calculate_plan_validity");
const generateId = require("../helpers/id_generator");
const { throwError } = require("../helpers/response_handler");
const {
  insufficientWalletFundError,
  planPurchaseSuccessful,
} = require("../helpers/response_messages");

// buy invoice plan for user
const buyPlan = async ({ user_id, plan_id, wallet_id }) => {
  try {
    // find plan by plan id
    const plan = await findPlanByPlanId(plan_id);

    // get plan cost
    const price = plan.plan_price;

    // find wallet by wallet id
    const wallet = await findWalletByWalletId(wallet_id);

    // get wallet balance
    let walletBalance = wallet.wallet_balance;

    // checking for enough funds in wallet
    if (price > walletBalance) {
      // update purchase status to failed with error message
      await updatePurchaseStatus(
        purchase_id,
        "FAILED",
        insufficientWalletFundError
      );

      throwError(insufficientWalletFundError);
    }

    // get plan units
    const invoice_units = plan.units;

    // deduct funds from wallet
    walletBalance = walletBalance - price;

    // create uuid4
    const purchase_id = generateId();

    // expiresAt
    const expiresAt = CalculateValidityDate(plan.validity);

    // present time
    const createdAt = Date.now();

    // create a purchase history
    await createPurchase({
      plan_id,
      user_id,
      purchase_id,
      createdAt,
      status: "PENDING",
      info: "PENDING",
    });
    // update wallet with new balance
    await updateWallet(wallet_id, "wallet_balance", walletBalance);
    // TODO change to mysql trigger
    await updateWallet(wallet_id, "updatedAt", Date.now());

    // checking if user has existing plan
    const existingPlan = await getUserPlanDetail(user_id);

    // check to see if user has an existing plan
    if (existingPlan) {
      // existing plan

      // new user plans values
      const values = [plan_id, invoice_units, expiresAt];

      // update userPlan
      await updateUserPlan(user_id, values);
    } else {
      // no existing plan, add a new one
      await addUserPlan({
        plan_id,
        user_id,
        expiresAt,
        invoice_units,
      });
    }
    // update purchase status
    await updatePurchaseStatus(purchase_id, "SUCCESS", planPurchaseSuccessful);
    // return plan
    return plan;
  } catch (error) {
    throw error;
  }
};

module.exports = buyPlan;
