const {
  getAllPlans,
  findPlanByPlanId,
  createPlan,
} = require("../../config/plan_db");
const {
  sendError,
  sendSuccess,
  throwError,
} = require("../helpers/response_handler");
const {
  fetchPlanSuccess,
  planNotFoundError,
  planCreateSuccess,
  noPlansFound,
} = require("../helpers/response_messages");

const { v4: uuidv4 } = require("uuid");

// controller for fetching all plans
const getAllPlansController = async (_, res) => {
  try {
    // fetch plans from database
    const plans = await getAllPlans();

    if (plans == null) {
      throwError(noPlansFound);
    }

    // return response
    sendSuccess(res, plans, fetchPlanSuccess);
  } catch (error) {
    sendError(res, error);
  }
};

// controller for get plan by plan id route
const getPlanByIdController = async (req, res) => {
  try {
    // user id  from request parameters
    let { plan_id } = req.params;

    // fetch plan from database
    const plan = await findPlanByPlanId(plan_id);

    if (plan === null) {
      throwError(planNotFoundError);
    }
    // return response
    sendSuccess(res, plan, fetchPlanSuccess);
  } catch (error) {
    sendError(res, error);
  }
};

// controller for create plan route
const createPlanController = async (req, res) => {
  try {
    // user id from request body
    const { plan_name, plan_price, units, validity, addon } = req.body;
    // created at and plan expiry
    const createdAt = Date.now();
    // validity to milliseconds
    const expiresAt = Date.now() + validity * 86400000;
    // generate plan id
    const plan_id = uuidv4();

    // create plan
    await createPlan({
      plan_id,
      plan_name,
      plan_price,
      units,
      validity,
      createdAt,
      expiresAt,
      addon: addon === false ? 0 : 1,
    });

    // response body
    sendSuccess(
      res,
      { plan_id, plan_name, plan_price, units, validity, createdAt, expiresAt },
      planCreateSuccess,
      201
    );
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getAllPlansController,
  getPlanByIdController,
  createPlanController,
};
