const mysqlConnection = require("./connection");
const {
  fetchUserPlanError,
  updateUserPlanInfoError,
  addUserPlanToDbError,
  deleteUserPlanFromDbError,
  noValidUserPlan,
} = require("../api/helpers/response_messages");

//  Add new plan to user
const addUserPlan = ({ plan_id, user_id, expiresAt, invoice_units }) => {
  try {
    // adds the plan to the database
    // returns the plan_id and plan_name
    return new Promise((resolve, reject) => {
      // saving new plan to database
      mysqlConnection.query(
        "INSERT INTO  userplans(plan_id,user_id,invoice_units,expiresAt,updatedAt,createdAt) VALUES (?,?,?,?,?,?)",
        [plan_id, user_id, invoice_units, expiresAt, Date.now(), Date.now()],
        async (error) => {
          // error inserting plan to database
          if (error) {
            reject({ success: false, message: addUserPlanToDbError });
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

// delete plan
const deleteUserPlan = (user_id) => {
  try {
    // adds the plan to the database
    // returns the plan_id and plan_name
    return new Promise((resolve, reject) => {
      // saving new plan to database
      mysqlConnection.query(
        "DELETE FROM userplans WHERE user_id = ?",
        [user_id],
        async (error) => {
          // error inserting plan to database
          if (error) {
            reject({ message: deleteUserPlanFromDbError });
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

// get all plans from database
const getUserPlanDetail = async (user_id) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "SELECT * FROM userplans WHERE user_id = ?",
        [user_id],
        async (error, result) => {
          if (error) {
            reject({
              message: fetchUserPlanError,
            });
          }
          if (result.length < 1) {
            resolve(null);
          } else {
            if (result.expiresAt < Date.now()) {
              await deleteUserPlan(user_id);
              reject({ message: noValidUserPlan });
            } else {
              resolve(result[0]);
            }
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

// updates user property
const updateUserPlan = (user_id, newValue) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        `UPDATE userplans SET plan_id =?,invoice_units = invoice_units + ?,expiresAt=?,updatedAt =?  WHERE user_id = ?`,
        [newValue[0], newValue[1], newValue[2], Date.now(), user_id],
        (error) => {
          if (error) {
            reject({ success: false, message: updateUserPlanInfoError });
          }

          resolve({ success: true });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  updateUserPlan,
  getUserPlanDetail,
  addUserPlan,
  deleteUserPlan,
};
