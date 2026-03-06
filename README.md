# 🏨 Room Booking System API

A backend API for a **Room Booking System** built using **Node.js, Express, and MySQL**.

This system allows users to:

* Register and login using JWT authentication
* View available rooms
* Check room availability for a selected date range
* Book a room
* Prevent double booking using date overlap validation

---

# 🚀 Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcrypt (Password Hashing)
* mysql2

---

# 📂 Project Structure

room-booking-api
│
├── src
│
├── config
│   └── database.js
│
├── models
│   ├── user.js
│   ├── room.js
│   └── booking.js
│
├── routes
│   ├── auth.js
│   └── booking.js
│
├── middleware
│   └── auth.js
│
└── app.js
│
├── README.md
├── architecture-notes.txt
├── database-schema.sql
└── postman-collection.json

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

git clone https://github.com/YOUR_USERNAME/room-booking-api.git
cd room-booking-api

---

## 2️⃣ Install Dependencies

npm install

---

## 3️⃣ Setup MySQL Database

Login to MySQL:

mysql -u root -p

Create database:

CREATE DATABASE room_booking;
USE room_booking;

---

## 4️⃣ Create Tables

Run this SQL:

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(100),
lastName VARCHAR(100),
emailId VARCHAR(100) UNIQUE,
password VARCHAR(255)
);

CREATE TABLE rooms (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
price_per_night DECIMAL(10,2)
);

INSERT INTO rooms (name, price_per_night)
VALUES
('Standard Room',2000),
('Deluxe Room',3500),
('Luxury Suite',5000);

CREATE TABLE bookings (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
room_id INT,
start_date DATE,
end_date DATE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (room_id) REFERENCES rooms(id)
);

---

# ▶️ Run the Server

npm run dev

Server runs on:

http://localhost:3000

---

# 📡 API Endpoints

## 🔐 Authentication

POST /signup

Body example:

{
"firstName": "Sachin",
"lastName": "Singh",
"emailId": "[sachin@gmail.com](mailto:sachin@gmail.com)",
"password": "123456"
}

---

POST /login

Body example:

{
"emailId": "[sachin@gmail.com](mailto:sachin@gmail.com)",
"password": "123456"
}

---

POST /logout

---

# 🏨 Rooms

GET /rooms

Example response:

[
{
"id": 1,
"name": "Standard Room",
"price_per_night": 2000
},
{
"id": 2,
"name": "Deluxe Room",
"price_per_night": 3500
}
]

---

# 📅 Booking

POST /check-availability

Body:

{
"roomId": 1,
"startDate": "2026-03-10",
"endDate": "2026-03-12"
}

---

POST /book-room

Body:

{
"roomId": 1,
"startDate": "2026-03-10",
"endDate": "2026-03-12"
}

---

# 🧠 Booking Logic

The system prevents **overlapping bookings** using the following SQL condition:

NOT (end_date < startDate OR start_date > endDate)

If a booking exists in the selected date range, the room cannot be booked again.

---

# 🔒 Security Features

* Password hashing using bcrypt
* JWT authentication
* Protected routes
* Cookie-based authentication

---

# 📌 Features

✔ User Registration
✔ User Login
✔ Room Listing
✔ Room Availability Check
✔ Room Booking
✔ Overlapping Booking Prevention
✔ Clean Backend Architecture

---

# 📬 Submission Includes

* GitHub Repository
* README Documentation
* Database Schema
* Postman Collection
* Architecture Notes

---

# 👨‍💻 Author

Sachin Singh
Backend Developer | Node.js | MySQL | DSA
