CREATE DATABASE ez_notes_dev;

use ez_notes_dev;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    username varchar(1000) NOT NULL, 
    password varchar(1000) NOT NULL, 
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint(1) DEFAULT 1,
    user_type tinyint(1) DEFAULT 1
);
INSERT INTO users (name, username, password) VALUES ('Admin', 'admin', 'admin'),('User', 'user', 'user');
