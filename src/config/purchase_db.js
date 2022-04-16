const {
  errorFetchingPurchaseData,
  updatePurchaseStatusError,
} = require("../api/helpers/response_messages");
const mysqlConnection = require("./connection");

//  Add purchase history
const createPurchase = ({
  plan_id,
  user_id,
  purchase_id,
  createdAt,
  status,
  info,
}) => {
  try {
    // adds the plan to the database
    // returns the plan_id and plan_name
    return new Promise((resolve, reject) => {
      // saving new purchase transaction to database
      mysqlConnection.query(
        "INSERT INTO  purchase(plan_id,user_id,purchase_id,createdAt,status,info) VALUES (?,?,?,?,?,?)",
        [plan_id, user_id, purchase_id, createdAt, status, info],
        async (error) => {
          // error inserting transaction to database
          if (error) {
            reject({ message: addTransactionToDbFailed });
          } else {
            resolve();
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

// find plan by the plan_id
const getPurchaseHistory = async (user_id) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "SELECT * FROM purchase WHERE user_id = ?",
        [user_id],
        (error, result) => {
          if (error) {
            reject({
              message: errorFetchingPurchaseData,
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

// updates purchase status property
const updatePurchaseStatus = (purchase_id, status, info) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        `UPDATE purchase SET status = ?, info =? WHERE purchase_id = ?`,
        [status, info, purchase_id],
        (error) => {
          if (error) {
            reject({ message: updatePurchaseStatusError });
          }

          resolve({ success: true });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { createPurchase, getPurchaseHistory, updatePurchaseStatus };
