CREATE DATABASE ez_notes_dev;

use ez_notes_dev;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    username varchar(1000) NOT NULL,
    password varchar(1000) NOT NULL,
    image_path varchar(1000) DEFAULT "",
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int DEFAULT 1,
    user_type int DEFAULT 1,
    PRIMARY KEY (id)
);

INSERT INTO
    users (name, username, password)
VALUES
    ('Admin', 'admin', 'admin'),
    ('User', 'user', 'user');

CREATE TABLE collections (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int DEFAULT 1,
    user_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO
    collections(name, user_id)
VALUES
    ('coleccion_1', 1),
    ('coleccion_2', 1),
    ('coleccion_1', 2),
    ('coleccion_2', 2);

CREATE TABLE notes (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    text_content varchar(255) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int DEFAULT 1,
    collection_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
);

INSERT INTO
    notes(name, text_content, collection_id)
VALUES
    (
        'clases de fisica',
        "masa por aceleracion es igual a uan fuerza con la misma direcion que la aceleracion",
        1
    ),
    ('clases de quimica', "la masa se conserva", 1);

CREATE TABLE images (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    path_file varchar(1000) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int DEFAULT 1,
    note_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
);

INSERT INTO
    images(name, path_file, note_id)
VALUES
    ('image_sobre_fisica', "test_path_fisica", 1),
    ('imagen_sobre_quimica', "test_path_quimica", 1);