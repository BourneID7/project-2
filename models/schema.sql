
DROP DATABASE IF EXISTS upstream_db;
CREATE DATABASE upstream_db;
USE upstream_db;

CREATE TABLE upstream (
 id Int( 11 ) AUTO_INCREMENT NOT NULL,
 Title VARCHAR( 200 ) NOT NULL,
 Info TEXT NOT NULL,
 Actors TEXT NOT NULL,
 Cover_Photo_url TEXT NOT NULL,
 Streaming_Services VARCHAR( 500 ) NOT NULL,
 Release_Date DATETIME NOT NULL,
 'Review' TEXT,
 'Watched' TINYINT(1)
 PRIMARY KEY ( id )
);
