    
-- Drops db if it currently exists
DROP DATABASE IF EXISTS burp_db;

-- Create the burp_db database 
CREATE DATABASE burp_db;

-- Specifies db for use
USE burp_db;

-- Create the reviews table inside burp_db
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT,
    stars INTEGER(5) NOT NULL, 
    PRIMARY KEY (id)
);

--For testing only
INSERT INTO reviews (stars, createdAt, updatedAt, BeerId, UserId)
VALUES (5, 01/01/2019, 01/01/2019, 3, 2);
