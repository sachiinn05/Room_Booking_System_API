const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Sachin@5609",   
  database: "room_booking",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;