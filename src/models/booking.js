const pool = require("../config/database");

class Booking {

  static async checkAvailability(roomId, startDate, endDate) {

    const [rows] = await pool.query(
      `SELECT * FROM bookings
       WHERE room_id = ?
       AND NOT (end_date < ? OR start_date > ?)`,
      [roomId, startDate, endDate]
    );

    return rows.length === 0;
  }

}

module.exports = Booking;