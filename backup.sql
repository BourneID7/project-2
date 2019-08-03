-- MySQL dump 10.13  Distrib 8.0.15, for osx10.14 (x86_64)
--
-- Host: localhost    Database: upstream_db
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Info` text NOT NULL,
  `Actors` text NOT NULL,
  `Cover_Photo_Url` text NOT NULL,
  `Steaming_Services` text,
  `Release_Date` datetime NOT NULL,
  `Review` text,
  `Watched` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'Up','Seventy-eight year old Carl Fredricksen travels to Paradise Falls in his home equipped with balloons, inadvertently taking a young stowaway.','Edward Asner, Christopher Plummer, Jordan Nagai, Bob Peterson','https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02','I wasn\'t really expecting to like this movie but it was great! Ok- I admit it... I cried at a cartoon.',1,'2019-07-31 16:23:04','2019-08-02 10:24:22'),(2,'The Princess Bride','While home sick in bed, a young boy\'s grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.','Cary Elwes, Mandy Patinkin, Chris Sarandon, Christopher Guest','https://m.media-amazon.com/images/M/MV5BMGM4M2Q5N2MtNThkZS00NTc1LTk1NTItNWEyZjJjNDRmNDk5XkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_SX300.jpg',NULL,'1970-01-01 00:00:01',NULL,1,'2019-07-31 16:37:51','2019-08-01 11:01:37'),(3,'The Avengers','Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.','Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth','https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02',NULL,1,'2019-08-01 10:46:27','2019-08-01 10:55:37'),(4,'The Lord of the Rings: The Fellowship of the Ring','A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.','Alan Howard, Noel Appleby, Sean Astin, Sala Baker','https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02',NULL,1,'2019-08-01 10:52:47','2019-08-01 11:46:18'),(5,'Harry Potter and the Deathly Hallows: Part 2','Harry, Ron, and Hermione search for Voldemort\'s remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.','Ralph Fiennes, Michael Gambon, Alan Rickman, Daniel Radcliffe','https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02','I love Harry Potter!',0,'2019-08-01 10:54:59','2019-08-03 14:22:54'),(6,'Timeline','A group of archaeologists become trapped in the past when they go there to retrieve a friend. The group must survive in 14th century France before they can escape back to the 21st Century.','Paul Walker, Frances O\'Connor, Gerard Butler, Billy Connolly','https://m.media-amazon.com/images/M/MV5BMTg5OTAyNDE3NV5BMl5BanBnXkFtZTYwOTkzMzE3._V1_SX300.jpg',NULL,'1970-01-01 00:00:02','great',0,'2019-08-01 11:01:06','2019-08-03 16:05:30'),(7,'Bridesmaids','Competition between the maid of honor and a bridesmaid, over who is the bride\'s best friend, threatens to upend the life of an out-of-work pastry chef.','Kristen Wiig, Terry Crews, Maya Rudolph, Tom Yi','https://m.media-amazon.com/images/M/MV5BMjAyOTMyMzUxNl5BMl5BanBnXkFtZTcwODI4MzE0NA@@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02','Couldn\'t  stop laughing! Plus it\'s based in Milwaukee so it\'s fun to see local scenery.',0,'2019-08-01 11:26:12','2019-08-02 10:27:06'),(11,'Wedding Crashers','John Beckwith and Jeremy Grey, a pair of committed womanizers who sneak into weddings to take advantage of the romantic tinge in the air, find themselves at odds with one another when John meets and falls for Claire Cleary.','Owen Wilson, Vince Vaughn, Christopher Walken, Rachel McAdams','https://m.media-amazon.com/images/M/MV5BZmJkNzViYjYtZWZlNy00OGE4LWI2MzUtYTcwNjY3Y2MyODIwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02','Very funny!',0,'2019-08-02 00:20:05','2019-08-03 14:24:31'),(18,'Ant-Man','Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must embrace his inner hero and help his mentor, Dr. Hank Pym, plan and pull off a heist that will save the world.','Paul Rudd, Michael Douglas, Evangeline Lilly, Corey Stoll','https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02',NULL,0,'2019-08-02 11:44:23','2019-08-02 11:44:23'),(19,'Star Wars: Episode IV - A New Hope','Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.','Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing','https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',NULL,'1970-01-01 00:00:01',NULL,0,'2019-08-03 00:50:28','2019-08-03 00:50:28'),(21,'Terminator 3: Rise of the Machines','A cybernetic warrior from a post-apocalyptic future travels back in time to protect a 25-year old drifter and his future wife from a most advanced robotic assassin and to ensure they both survive a nuclear attack.','Arnold Schwarzenegger, Nick Stahl, Claire Danes, Kristanna Loken','https://m.media-amazon.com/images/M/MV5BMTk5NzM1ODgyN15BMl5BanBnXkFtZTcwMzA5MjAzMw@@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02',NULL,0,'2019-08-03 14:08:52','2019-08-03 14:08:52'),(22,'Terminator 3: Rise of the Machines','A cybernetic warrior from a post-apocalyptic future travels back in time to protect a 25-year old drifter and his future wife from a most advanced robotic assassin and to ensure they both survive a nuclear attack.','Arnold Schwarzenegger, Nick Stahl, Claire Danes, Kristanna Loken','https://m.media-amazon.com/images/M/MV5BMTk5NzM1ODgyN15BMl5BanBnXkFtZTcwMzA5MjAzMw@@._V1_SX300.jpg',NULL,'1970-01-01 00:00:02',NULL,0,'2019-08-03 16:04:49','2019-08-03 16:04:49');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Sessions` (
  `session_id` varchar(255) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `expires_index` (`expires`),
  KEY `createdAt_index` (`createdAt`),
  KEY `updatedAt_index` (`updatedAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'test39','$2b$10$WJ5kHGUACJs4yBthMvVky.J5ce8Mu028g821mEkmF21aPbQ69PUOO','2019-07-31 16:27:07','2019-07-31 16:27:07'),(2,'test1','$2b$10$t.4YjsKczrvtDjWxQzcD..xq6kHkFnx51PpBu6lTh9BxQEumqE8Ce','2019-08-01 10:42:51','2019-08-01 10:42:51');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-03 13:51:23
