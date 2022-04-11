const {
  sendError,
  sendSuccess,
  throwError,
} = require("../helpers/response_handler");
const { v4: uuidv4 } = require("uuid");
const {
  createWallet,
  updateWallet,
  getAllWallets,
  findWalletByUserId,
} = require("../../config/wallet_db");
const {
  walletCreateSuccess,
  fetchWalletSuccess,
  walletFundSuccess,
  walletNotFoundError,
} = require("../helpers/response_messages");

// controller for get all wallets route
const getWalletsController = async (req, res) => {
  try {
    // fetch wallet from database
    const wallet = await getAllWallets();
    console.log(wallet, 7478287);

    // return response
    sendSuccess(res, wallet, fetchWalletSuccess);
  } catch (error) {
    sendError(res, error);
  }
};
// controller for get wallet by id route
const getWalletByIdController = async (req, res) => {
  try {
    // user id  from request parameters
    let { user_id } = req.params;

    // fetch wallet from database
    const wallet = await findWalletByUserId(user_id);

    if (wallet === null) {
      throwError(walletNotFoundError);
    }
    // return response
    sendSuccess(res, wallet, fetchWalletSuccess);
  } catch (error) {
    sendError(res, error);
  }
};

// controller for get wallet balance route
const walletHistoryController = (req, res) => {
  try {
    sendSuccess(res, {});
  } catch (error) {
    sendError(res, error);
  }
};

// controller for create wallet route
const createWalletController = async (req, res) => {
  try {
    // user id from request body
    const { user_id } = req.body;
    // created at
    const createdAt = Date.now();
    const updatedAt = Date.now();
    // generate wallet id
    const wallet_id = uuidv4();

    // create wallet
    await createWallet({ user_id, wallet_id, createdAt, updatedAt });

    // response body
    sendSuccess(res, { wallet_id, user_id }, walletCreateSuccess, 201);
  } catch (error) {
    sendError(res, error);
  }
};

// TODO TRIGGER FOR UPDATE AT AND CREATED AT
// controller for fund wallet
const fundWalletController = async (req, res) => {
  try {
    // get wallet id from request body
    const { wallet_id, amount } = req.body;

    // update wallet with funds
    await updateWallet(wallet_id, "wallet_balance", amount);
    // return response
    sendSuccess(res, {}, walletFundSuccess);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getWalletsController,
  getWalletByIdController,
  walletHistoryController,
  createWalletController,
  fundWalletController,
};
