-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 09-03-2023 a las 19:29:06
-- Versión del servidor: 8.0.32
-- Versión de PHP: 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ez_notes_dev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collections`
--

CREATE TABLE `collections` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `collections`
--

INSERT INTO `collections` (`id`, `name`, `created_at`, `updated_at`, `status`, `user_id`) VALUES
(1, 'Trabajo', '2023-03-08 16:09:12', '2023-03-09 11:21:51', 1, 1),
(2, 'EPN', '2023-03-08 16:09:12', '2023-03-09 11:23:10', 1, 1),
(3, 'coleccion_1', '2023-03-08 16:09:12', '2023-03-08 16:09:12', 1, 2),
(4, 'coleccion_2', '2023-03-08 16:09:12', '2023-03-08 16:09:12', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `path_file` varchar(1000) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  `note_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `name`, `path_file`, `created_at`, `updated_at`, `status`, `note_id`) VALUES
(3, 'plus (1).png', '/home/ron/projects/ez-notes/ez-notes-backend/files/images/note_1/plus (1).png', '2023-03-08 11:25:27', '2023-03-08 11:25:27', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notes`
--

CREATE TABLE `notes` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `text_content` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  `collection_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `notes`
--

INSERT INTO `notes` (`id`, `name`, `text_content`, `created_at`, `updated_at`, `status`, `collection_id`) VALUES
(1, 'patutan', '1. cambiar simulador\n2. cambiar gama de colores', '2023-03-08 16:09:12', '2023-03-09 11:22:30', 1, 1),
(2, 'servipagos', '1. aniadir datos cliente fantasma\n2. a;adir funcion de agregar pantilla fantasma', '2023-03-08 16:09:12', '2023-03-09 11:23:02', 1, 1),
(4, 'nota test', 'test body', '2023-03-08 15:28:26', '2023-03-08 15:28:40', 1, 3),
(8, 'WEB', '1. terminar proyecto\n2. realizar doc de informe', '2023-03-09 11:13:06', '2023-03-09 11:23:50', 1, 2),
(9, 'IA', '1. terminar proyecto\n2. presentacion proyecto', '2023-03-09 11:23:58', '2023-03-09 11:24:15', 1, 2),
(14, 'BDD', 'supletorio', '2023-03-09 14:08:27', '2023-03-09 14:08:27', 1, 2),
(15, 'Redes', '1. Examen', '2023-03-09 14:08:47', '2023-03-09 14:08:47', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(1000) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `image_path` varchar(1000) DEFAULT '',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  `user_type` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `image_path`, `created_at`, `updated_at`, `status`, `user_type`) VALUES
(1, 'Ronny', 'R00rss', 'admin', '/home/ron/projects/ez-notes/ez-notes-backend/files/images/note_1/gafas.jpg', '2023-03-08 16:09:12', '2023-03-09 17:54:14', 1, 1),
(2, 'User', 'user', 'user', '', '2023-03-08 16:09:12', '2023-03-08 16:09:12', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `note_id` (`note_id`);

--
-- Indices de la tabla `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collection_id` (`collection_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
