-- Drops db if it currently exists
DROP DATABASE IF EXISTS burp_db;

-- Create the burp_db database 
CREATE DATABASE burp_db;

-- Specifies db for use
USE burp_db;

-- Create the users table inside burp_db
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    birthday DATE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(32) NOT NULL, 
    zip INTEGER(5) NOT NULL, 
   
    PRIMARY KEY (id)
);