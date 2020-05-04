-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mer. 29 avr. 2020 à 21:56
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `supermarket`
--

-- --------------------------------------------------------

--
-- Structure de la table `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `Frs_id` int(11) NOT NULL,
  `Frs_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Société` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tel` int(10) NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `fournisseurs`
--

INSERT INTO `fournisseurs` (`Frs_id`, `Frs_name`, `Société`, `Address`, `Tel`, `Email`) VALUES
(1, 'abdilah', 'jawda', 'bloc 5', 645342387, 'jawda-safi@support.com'),
(2, 'abdilah', 'jawda', 'bloc 5', 645342387, 'jawda-safi@support.com');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `produit_id` int(11) NOT NULL,
  `produit_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` decimal(10,0) DEFAULT NULL,
  `Quantité` int(11) NOT NULL,
  `Frs_id` int(11) NOT NULL,
  `Rayon_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rayons`
--

CREATE TABLE `rayons` (
  `Rayon_id` int(11) NOT NULL,
  `Rayon_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rayons`
--

INSERT INTO `rayons` (`Rayon_id`, `Rayon_name`) VALUES
(1, 'lait');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`Frs_id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`produit_id`),
  ADD KEY `produits_ibfk_1` (`Frs_id`),
  ADD KEY `produits_ibfk_2` (`Rayon_id`);

--
-- Index pour la table `rayons`
--
ALTER TABLE `rayons`
  ADD PRIMARY KEY (`Rayon_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  MODIFY `Frs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `produit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rayons`
--
ALTER TABLE `rayons`
  MODIFY `Rayon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`Frs_id`) REFERENCES `fournisseurs` (`Frs_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produits_ibfk_2` FOREIGN KEY (`Rayon_id`) REFERENCES `rayons` (`Rayon_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
