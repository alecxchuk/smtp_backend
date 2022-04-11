const mysqlConnection = require("./connection");
const {
  fetchUserAfterInsertError,
  addWalletToDbError,
  fetchWalletError,
  deleteWalletError,
  updateWalletError,
} = require("../api/helpers/response_messages");

// find wallet by the wallet_id
const getAllWallets = async () => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "SELECT * FROM wallet",

        (error, result) => {
          if (error) {
            reject({
              message: fetchWalletError,
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
// find wallet by the wallet_id
const findWalletByWalletId = async (wallet_id) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "SELECT * FROM wallet WHERE wallet_id = ?",
        [wallet_id],
        (error, result) => {
          if (error) {
            reject({
              message: fetchWalletError,
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
// find wallet by the user_id
const findWalletByUserId = async (user_id) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "SELECT * FROM wallet WHERE user_id = ?",
        [user_id],
        (error, result) => {
          if (error) {
            reject({
              message: fetchWalletError,
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

//  Add user to data base
const createWallet = ({ user_id, wallet_id, createdAt, updatedAt }) => {
  try {
    // adds the user to the database
    // returns the user email and user_id
    return new Promise((resolve, reject) => {
      // saving new user to database
      mysqlConnection.query(
        "INSERT INTO  wallet(wallet_id,user_id,wallet_balance,createdAt,updatedAt) VALUES (?,?,?,?,?)",
        [wallet_id, user_id, 0, createdAt, updatedAt],
        async (error, result) => {
          // error inserting user to database
          if (error) {
            reject({ message: addWalletToDbError });
          } else {
            // getting user id and email from database
            const wallet = await findWalletByWalletId(wallet_id);

            // no user with email was found
            if (wallet === null) {
              reject({
                message: fetchUserAfterInsertError,
              });
            }

            resolve({ wallet_id, user_id });
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

// deletes wallet_id from database
const deleteWallet = (wallet_id) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        "DELETE FROM wallet WHERE wallet_id = ?",
        [wallet_id],
        (error) => {
          if (error) {
            reject({ message: deleteWalletError });
          }

          resolve({ success: true });
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

// updates wallet property
const updateWallet = (wallet_id, property, newValue) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        `UPDATE wallet SET ${property} = ? WHERE wallet_id = ?`,
        [newValue, wallet_id],
        (error) => {
          if (error) {
            reject({ message: updateWalletError });
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
  findWalletByUserId,
  findWalletByWalletId,
  createWallet,
  deleteWallet,
  updateWallet,
  getAllWallets,
};
