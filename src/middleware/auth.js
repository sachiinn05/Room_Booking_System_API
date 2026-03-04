const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {

  try {

    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please login");
    }

    const decoded = jwt.verify(token, "DEV@RoomBooking123");

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;

    next();

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }

};

module.exports = { userAuth };