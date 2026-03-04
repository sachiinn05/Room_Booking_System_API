const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();



authRouter.post("/signup", async (req, res) => {
  try {

    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    await User.createUser(firstName, lastName, emailId, passwordHash);

    res.send({
      message: "User registered successfully"
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});



authRouter.post("/login", async (req, res) => {
  try {

    const { emailId, password } = req.body;

    const user = await User.findByEmail(emailId);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await User.validatePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Password incorrect");
    }

    const token = await User.getJWT(user);

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.send({
      message: "Login successful",
      data: user
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});



authRouter.post("/logout", (req, res) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout successful");

});

module.exports = authRouter;