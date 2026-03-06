const express = require("express");
const pool = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const bookingRouter = require("./routes/booking");

const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/",bookingRouter)



async function testDB() {
  try {
    await pool.query("SELECT 1");
    console.log("Database Connected");
  } catch (err) {
    console.log("DB Error:", err.message);
  }
}

testDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});