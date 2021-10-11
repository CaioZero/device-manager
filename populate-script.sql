DROP SCHEMA IF EXISTS `db_device` ;

CREATE SCHEMA IF NOT EXISTS `db_device` DEFAULT CHARACTER SET utf8 ;

use db_device;

CREATE table IF NOT EXISTS category (
  id int NOT NULL auto_increment PRIMARY KEY,
  name varchar(128) NOT NULL);
  
 INSERT INTO category
VALUES (1,'Category 1'),(2,'Category 2'),(3,'Category 3'),(4,'Category 4'),(5,'Category 5'),(6,'Category 6'),(7,'Category 7'),(8,'Category 8'),(9,'Category 9'),(10,'Category 10'),(11,'Category 11'),(12,'Category 12'),(13,'Category 13'),(14,'Category 14'),(15,'Category 15'),(16,'Category 16'),(17,'Category 17'),(18,'Category 18'),(19,'Category 19'),(20,'Category 20'),(21,'Category 21'),(22,'Category 22');

CREATE TABLE IF NOT exists device (
  id int NOT NULL AUTO_INCREMENT,
  color varchar(16) NOT NULL,
  part_number int NOT NULL,
  categoryId int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FK_cc4b2d26310a880c63116ed2c68 (categoryId),
  CONSTRAINT FK_cc4b2d26310a880c63116ed2c68 FOREIGN KEY (categoryId) REFERENCES category (id) ON DELETE CASCADE
);

INSERT INTO device VALUES (1,'Blue',123456,1),(2,'Yellow',1236654,2),(3,'Blue',654,4),(4,'Black',6874,1),(5,'Pink',5475,1),(6,'Brown',6874,8),(7,'Scarlat',5475,13);
