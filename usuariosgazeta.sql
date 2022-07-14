-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-07-2022 a las 22:38:10
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gazetadb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosgazeta`
--

CREATE TABLE `usuariosgazeta` (
  `id` int(10) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `nivel_acceso` varchar(50) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `emailusuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuariosgazeta`
--

INSERT INTO `usuariosgazeta` (`id`, `nombre_usuario`, `nivel_acceso`, `contraseña`, `fecha_nacimiento`, `emailusuario`) VALUES
(2, 'test1', 'lector', '$2b$06$2633.6vrbeS1CYzRzDxA.OtlJGa2UyWR9RAR.k5ruul2nIIj2UPv.', '2022-06-22', 'prueba@gmail.com'),
(3, 'Martin', 'lector', '$2b$08$Ao.FlxXYKEhMSGQ0z8XIauzVaqyeA3sBIbuNX/wucFa0EerukglPu', '0000-00-00', 'test@test.com'),
(4, 'Agustín Santiago Iglesias1', 'lector', '$2b$08$iw.idfJCsjMKNrz5pMBdwOCksybU9RRUfUEjKYfiMK9eb/N1IVa3K', '1975-01-13', 'asiiglesias99@gmail.com'),
(5, 'Alfas', 'lector', '$2b$08$OdN.dK643ToaPQ7gH1h8WeouF57orQfsO1zq5EEVpHjlSKPcLjMeq', '0000-00-00', 'testeamos@gmail.com'),
(6, 'Betas', 'lector', '$2b$08$AtiDMAQf24rmlsiI6K8FfeW/2aATOhuf7srK9XVUxy9gJOg0opTmK', '0000-00-00', 'otrointento@gmail.com'),
(7, 'Omega', 'lector', '$2b$08$O/3oOTeszieJrf.9.Fin3.UyxT1hiBEf9lDJ05U3WsiEZW3EZTJLa', '0000-00-00', 'omegafinal@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuariosgazeta`
--
ALTER TABLE `usuariosgazeta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `emailusuario` (`emailusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuariosgazeta`
--
ALTER TABLE `usuariosgazeta`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
