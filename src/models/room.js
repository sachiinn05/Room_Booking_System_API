const pool = require("../config/database");

class Room {

  static async getAllRooms() {

    const [rows] = await pool.query(
      "SELECT * FROM rooms"
    );

    return rows;
  }

}

module.exports = Room;