const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {

  static async createUser(firstName, lastName, emailId, password) {
    const [result] = await pool.query(
      "INSERT INTO users (firstName,lastName,emailId,password) VALUES (?,?,?,?)",
      [firstName, lastName, emailId, password]
    );
    return result;
  }

  static async findByEmail(emailId) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE emailId = ?",
      [emailId]
    );

    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    return rows[0];
  }

  static async getJWT(user) {
    return jwt.sign(
      { id: user.id },
      "DEV@RoomBooking123",
      { expiresIn: "7d" }
    );
  }

  static async validatePassword(passwordInput, passwordHash) {
    return bcrypt.compare(passwordInput, passwordHash);
  }
}

module.exports = User;