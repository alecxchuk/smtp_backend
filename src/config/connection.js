const mysql = require("mysql");
// env variables
require("dotenv").config();
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MY_SQL_PASSWORD,
  database: "smtp",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err);
    console.log("Connection Failed");
  }
});

module.exports = mysqlConnection;
