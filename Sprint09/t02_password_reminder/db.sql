CREATE DATABASE sword;

CREATE USER 'nickfury' @'localhost' IDENTIFIED BY 'securepass';
GRANT ALL ON sword.* TO 'nickfury' @'localhost';

USE sword;

CREATE TABLE
  IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(32) NOT NULL,
    role ENUM ('user', 'admin') DEFAULT 'user' NOT NULL
  );

SELECT * FROM users;
