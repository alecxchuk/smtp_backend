const { throwError, sendError } = require("../helpers/response_handler");
const {
  notAuthorized,
  jwtExpiredError,
} = require("../helpers/response_messages");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // const bearerToken = req.headers["x-access-token"];

  try {
    // authorization bearer
    const bearerToken = req.headers["authorization"];

    // token
    const token = bearerToken.split(" ")[1];
    if (!token) {
      throwError("No token found");
    } else {
      // verify token
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          if (error.message === "jwt expired") {
            throwError(jwtExpiredError);
          }
          throwError(notAuthorized);
        } else {
          req.user_id = decoded.id;
          next();
        }
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = verifyJWT;
