const mysqlConnection = require("./connection");
const {
  fetchPlanError,
  addPlanToDbError,
} = require("../api/helpers/response_messages");

// get all plans from database
const getAllPlans = async () => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "SELECT * FROM plans",

        (error, result) => {
          if (error) {
            reject({
              message: fetchPlanError,
            });
          }

          if (result.length < 1) {
            resolve(null);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
// find plan by the plan_id
const findPlanByPlanId = async (plan_id) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "SELECT * FROM plans WHERE plan_id = ?",
        [plan_id],
        (error, result) => {
          if (error) {
            reject({
              message: fetchPlanError,
            });
          }
          if (result.length < 1) {
            resolve(null);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

//  Add plan to data base
const createPlan = ({
  plan_id,
  plan_name,
  plan_price,
  units,
  validity,
  addon,
  expiresAt,
  createdAt,
}) => {
  try {
    // adds the plan to the database
    // returns the plan_id and plan_name
    return new Promise((resolve, reject) => {
      // saving new plan to database
      mysqlConnection.query(
        "INSERT INTO  plans(plan_id,plan_name,plan_price,units,validity,addon,createdAt,expiresAt) VALUES (?,?,?,?,?,?,?,?)",
        [
          plan_id,
          plan_name,
          plan_price,
          units,
          validity,
          addon,
          createdAt,
          expiresAt,
        ],
        async (error) => {
          // error inserting plan to database
          if (error) {
            console.log(error.message, 343);
            reject({ message: addPlanToDbError });
          } else {
            resolve({ plan_id, plan_name });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { findPlanByPlanId, getAllPlans, createPlan };
