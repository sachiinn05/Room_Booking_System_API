const express = require("express");
const bookingRouter = express.Router();


const pool = require("../config/database");
const Room = require("../models/room");
const Booking = require("../models/booking");
const { userAuth } = require("../middleware/auth");



bookingRouter.get("/rooms", userAuth, async (req, res) => {

  try {

    const rooms = await Room.getAllRooms();

    res.send(rooms);

  } catch (err) {
    res.status(400).send(err.message);
  }

});



bookingRouter.post("/check-availability", userAuth, async (req, res) => {

  try {

    const { roomId, startDate, endDate } = req.body;

    const available = await Booking.checkAvailability(
      roomId,
      startDate,
      endDate
    );

    if (!available) {
      return res.send({
        available: false,
        message: "Room already booked for these dates"
      });
    }

    res.send({
      available: true,
      message: "Room available"
    });

  } catch (err) {
    res.status(400).send(err.message);
  }

});



bookingRouter.post("/book-room", userAuth, async (req, res) => {

  const connection = await pool.getConnection();

  try {

    const { roomId, startDate, endDate } = req.body;
    const userId = req.userId;

    await connection.beginTransaction();

    const [rows] = await connection.query(
      `SELECT * FROM bookings
       WHERE room_id = ?
       AND NOT (end_date < ? OR start_date > ?)`,
      [roomId, startDate, endDate]
    );

    if (rows.length > 0) {

      await connection.rollback();

      return res.status(400).send({
        message: "Room already booked for these dates"
      });
    }

    await connection.query(
      `INSERT INTO bookings
       (user_id, room_id, start_date, end_date)
       VALUES (?, ?, ?, ?)`,
      [userId, roomId, startDate, endDate]
    );

    await connection.commit();

    res.send({
      message: "Room booked successfully"
    });

  } catch (err) {

    await connection.rollback();

    res.status(400).send(err.message);

  } finally {

    connection.release();

  }

});

module.exports = bookingRouter;