-- Drops db if it currently exists
DROP DATABASE IF EXISTS burp_db;

-- Create the burp_db database 
CREATE DATABASE burp_db;

-- Specifies db for use
USE burp_db;

-- Create the beers table inside burp_db
CREATE TABLE beers (
    -- Numeric ID column which will increment its default value with each new row
    id INT NOT NULL AUTO_INCREMENT,

    -- Creates a string with the beer names that cannot contain a null value
    beer_name VARCHAR(255) NOT NULL,

    -- Creates a decimal value for the alcohol blood volume percentage that cannot contain a null value
    abv DECIMAL(2 , 1 ) NOT NULL,

    -- Creates a string with the beer type that cannot contain a null value
    beer_type VARCHAR(255) NOT NULL,

    -- Creates a string with the names of the place beer was brewed which cannot contain a null value
    brewery_name VARCHAR(255) NOT NULL,

    -- Creates a boolean stating if it was a beer that was tasted or not
    drank_beer BOOLEAN DEFAULT false,

    -- Sets id as this table's primary key which means all data contained within it will be unique
    PRIMARY KEY (id)
);