CREATE DATABASE room_booking;

USE room_booking;

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