-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: backend
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking_bunk`
--

DROP TABLE IF EXISTS `booking_bunk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_bunk` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bunk_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_bunk_booking_id_bunk_id_unique` (`booking_id`,`bunk_id`),
  KEY `booking_bunk_bunk_id_foreign` (`bunk_id`),
  CONSTRAINT `booking_bunk_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `booking_bunk_bunk_id_foreign` FOREIGN KEY (`bunk_id`) REFERENCES `bunks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_bunk`
--

LOCK TABLES `booking_bunk` WRITE;
/*!40000 ALTER TABLE `booking_bunk` DISABLE KEYS */;
INSERT INTO `booking_bunk` VALUES (1,'594edd16-4721-40ea-8dd5-b26aad58e75c',2,NULL,NULL),(2,'594edd16-4721-40ea-8dd5-b26aad58e75c',4,NULL,NULL),(3,'594edd16-4721-40ea-8dd5-b26aad58e75c',6,NULL,NULL),(4,'25e46e5e-7d62-42dd-b870-b4e9e898e58f',3,NULL,NULL),(5,'25e46e5e-7d62-42dd-b870-b4e9e898e58f',7,NULL,NULL),(6,'715327d1-7901-44fe-81e8-cf6e8e479345',3,NULL,NULL),(7,'ba495874-7b63-4fea-a48a-302405d0ddbc',1,NULL,NULL),(8,'845125aa-01fb-42d5-9dd8-db16e533b760',5,NULL,NULL),(9,'1088a925-1433-4cae-8c51-20389e251f02',8,NULL,NULL),(10,'1de81b7b-0b88-42e8-abc1-96a287427a68',1,NULL,NULL),(11,'ba51fae8-c104-4c81-9b58-5dbd9fd3c1f0',2,NULL,NULL),(12,'28f6a74a-e2e2-45e8-8382-0d52b19dbc02',3,NULL,NULL),(13,'7962ece3-8031-4201-8169-f1be470a3db9',4,NULL,NULL),(14,'31870e44-de4f-4296-8b94-9f98e6903b9f',5,NULL,NULL),(15,'99a7ed60-e109-4e74-b67a-2a5d3ec4bf7b',6,NULL,NULL),(16,'e5ada9ed-3b72-4b74-a8a3-a150634d5606',7,NULL,NULL),(17,'7c850279-1df6-4b41-a6ac-a5f5624d81f7',8,NULL,NULL),(18,'716f9fc0-526e-42a2-9ef1-56949ada41d2',7,NULL,NULL),(19,'6d4ce7a5-89b0-434b-b2fe-dd7a002741e1',1,NULL,NULL),(20,'6d4ce7a5-89b0-434b-b2fe-dd7a002741e1',2,NULL,NULL),(21,'7a867618-d120-468d-88da-1731b191e2b0',3,NULL,NULL),(22,'2c2842fe-7d92-4cac-aa11-746fe3a25a73',4,NULL,NULL),(23,'2c2842fe-7d92-4cac-aa11-746fe3a25a73',5,NULL,NULL);
/*!40000 ALTER TABLE `booking_bunk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookings_user_id_foreign` (`user_id`),
  CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES ('1088a925-1433-4cae-8c51-20389e251f02','2021-01-05','2021-01-15','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:16:08','2021-01-18 12:16:08'),('1de81b7b-0b88-42e8-abc1-96a287427a68','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:21:04','2021-01-18 12:21:04'),('25e46e5e-7d62-42dd-b870-b4e9e898e58f','2021-01-03','2021-01-07','d7c9f4ee-9f72-4b6d-9a6d-54e5bd2d5808','2021-01-18 10:25:53','2021-01-18 10:25:53'),('28f6a74a-e2e2-45e8-8382-0d52b19dbc02','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:22:09','2021-01-18 12:22:09'),('2c2842fe-7d92-4cac-aa11-746fe3a25a73','2020-12-29','2020-12-30','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:39:01','2021-01-18 12:39:01'),('31870e44-de4f-4296-8b94-9f98e6903b9f','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:24:02','2021-01-18 12:24:02'),('41039cf4-3f47-46c4-bc5f-98f229673b64','2021-01-05','2021-01-15','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:15:44','2021-01-18 12:15:44'),('594edd16-4721-40ea-8dd5-b26aad58e75c','2021-01-01','2021-01-06','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 10:25:53','2021-01-18 10:25:53'),('6d4ce7a5-89b0-434b-b2fe-dd7a002741e1','2020-12-29','2020-12-30','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:38:18','2021-01-18 12:38:18'),('715327d1-7901-44fe-81e8-cf6e8e479345','2021-01-02','2021-01-04','d7c9f4ee-9f72-4b6d-9a6d-54e5bd2d5808','2021-01-18 10:26:39','2021-01-18 10:26:39'),('716f9fc0-526e-42a2-9ef1-56949ada41d2','2020-12-29','2020-12-30','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:37:03','2021-01-18 12:37:03'),('7962ece3-8031-4201-8169-f1be470a3db9','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:22:43','2021-01-18 12:22:43'),('7a867618-d120-468d-88da-1731b191e2b0','2020-12-29','2020-12-30','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:38:39','2021-01-18 12:38:39'),('7c850279-1df6-4b41-a6ac-a5f5624d81f7','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:31:42','2021-01-18 12:31:42'),('845125aa-01fb-42d5-9dd8-db16e533b760','2021-01-05','2021-01-15','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:14:50','2021-01-18 12:14:50'),('99a7ed60-e109-4e74-b67a-2a5d3ec4bf7b','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:24:29','2021-01-18 12:24:29'),('ba495874-7b63-4fea-a48a-302405d0ddbc','2021-01-05','2021-01-15','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 11:10:23','2021-01-18 11:10:23'),('ba51fae8-c104-4c81-9b58-5dbd9fd3c1f0','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:21:40','2021-01-18 12:21:40'),('e5ada9ed-3b72-4b74-a8a3-a150634d5606','2020-12-28','2020-12-29','1a6970cc-409a-439f-9ba7-b39c46b905d5','2021-01-18 12:26:15','2021-01-18 12:26:15');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bunks`
--

DROP TABLE IF EXISTS `bunks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bunks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bunks_room_id_foreign` (`room_id`),
  CONSTRAINT `bunks_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bunks`
--

LOCK TABLES `bunks` WRITE;
/*!40000 ALTER TABLE `bunks` DISABLE KEYS */;
INSERT INTO `bunks` VALUES (1,'A',1,'2021-01-18 10:25:53','2021-01-18 10:25:53'),(2,'B',1,'2021-01-18 10:25:53','2021-01-18 10:25:53'),(3,'C',1,'2021-01-18 10:25:53','2021-01-18 10:25:53'),(4,'A',2,'2021-01-18 10:25:53','2021-01-18 10:25:53'),(5,'B',2,'2021-01-18 10:25:53','2021-01-18 10:25:53'),(6,'C',2,'2021-01-18 10:25:53','2021-01-18 10:25:53'),(7,'D',2,'2021-01-18 10:25:53','2021-01-18 10:25:53'),(8,'E',2,'2021-01-18 10:25:53','2021-01-18 10:25:53');
/*!40000 ALTER TABLE `bunks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2020_09_27_141802_create_rooms_table',1),(2,'2020_09_27_142311_create_bunks_table',1),(3,'2020_09_29_085753_create_users_table',1),(4,'2020_09_29_112134_create_bookings_table',1),(5,'2021_01_17_220130_create_booking_bunks_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Höger','2021-01-18 10:25:53','2021-01-18 10:25:53'),(2,'Vänster','2021-01-18 10:25:53','2021-01-18 10:25:53');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phonenumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1a6970cc-409a-439f-9ba7-b39c46b905d5','Thomas','Granbohm','thomas@granbohm.dev','0736761614','2021-01-18 10:25:53','2021-01-18 10:25:53'),('d7c9f4ee-9f72-4b6d-9a6d-54e5bd2d5808','Sven','Svensson','sven.svensson@exempel.se','0712345678','2021-01-18 10:25:53','2021-01-18 10:25:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-18 12:43:37
