const { v4: uuidv4 } = require("uuid");

// returns a generated id
const generateId = () => {
  return uuidv4();
};

module.exports = generateId;
