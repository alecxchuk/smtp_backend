// receives the validity of a plan
// returns the expiry date of the plan
const CalculateValidityDate = (validity) => {
  return Date.now() + validity * 86400000;
};

module.exports = CalculateValidityDate;
