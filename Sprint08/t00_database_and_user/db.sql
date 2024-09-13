CREATE DATABASE ucode_web;
CREATE USER 'nartem' @'localhost' IDENTIFIED BY 'securepass';
GRANT ALL ON ucode_web.* TO 'nartem' @'localhost';