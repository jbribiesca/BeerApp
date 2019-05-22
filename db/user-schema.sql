    
-- Drops db if it currently exists
DROP DATABASE IF EXISTS burp_db;

-- Create the burp_db database 
CREATE DATABASE burp_db;

-- Specifies db for use
USE burp_db;

-- Create the users table inside burp_db
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(32) NOT NULL, 
    birthday DATE NOT NULL,
    zip INTEGER(5) NOT NULL,
    last_login DATE,
    status ENUM ("active", "inactive"),
    PRIMARY KEY (id)
);

--For testing only
INSERT INTO users (first_name, last_name, email, password, birthday, zip)
VALUES ("Joe", "Smith", "joesmith@email.com", "password", "1990/01/01", 11111);
