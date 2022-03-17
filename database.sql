-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- This is the basic layout of the user table, this needs to be incorporated somehow.
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );
--------------------END INTRODUCTION------------------------------------



----------------- DELETE/RESET TABLES ---------------------------------
-- When reseting the data tables, 
-- run these commands in the order that they're in!
DROP TABLE "calendar";
DROP TABLE "user";
DROP TABLE "block";
----------------- DELETE/RESET TABLES ---------------------------------


----------------------- DATA TABLE SETUP ------------------------------------------------
-- These data tables and test data can be created successfully if
-- you highlight and execute everything below this line.
CREATE TABLE "block" (
"id" SERIAL PRIMARY KEY,
"mo1" BOOLEAN NOT NULL,
"tu1" BOOLEAN NOT NULL,
"we1" BOOLEAN NOT NULL,
"th1" BOOLEAN NOT NULL,
"fr1" BOOLEAN NOT NULL,
"sa1" BOOLEAN NOT NULL,
"su1" BOOLEAN NOT NULL,
"mo2" BOOLEAN NOT NULL,
"tu2" BOOLEAN NOT NULL,
"we2" BOOLEAN NOT NULL,
"th2" BOOLEAN NOT NULL,
"fr2" BOOLEAN NOT NULL,
"sa2" BOOLEAN NOT NULL,
"su2" BOOLEAN NOT NULL);

CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR (80) UNIQUE NOT NULL,
"password" VARCHAR (1000) NOT NULL,
"first_name" VARCHAR(80),
"last_name" VARCHAR(80),
"role" VARCHAR(50),
"block_id" INT REFERENCES "block",
"shift_timeframe" VARCHAR(80),
"pay_rate" NUMERIC(5,2));

CREATE TABLE "calendar" (
"id" SERIAL PRIMARY KEY,
"date" DATE,
"staff_id" INT REFERENCES "user",
"shift_time" VARCHAR(40)); ---- This represents the same value as the "shift_timeframe"
-- in the "user" table, name was changed to avoid potential mixups later on.
----------------------- DATA TABLE SETUP ------------------------------------------------



---------------------------- TEST DATA -----------------------------------------------------------------
INSERT INTO "block" ("mo1","tu1","we1","th1","fr1","sa1","su1","mo2","tu2","we2","th2","fr2","sa2","su2")
VALUES 
(true, true, false, false, true, true, true, false, false, true, true, false, false, false),
(false, false, true, true, false, false, false, true, true, false, false, true, true, true);

INSERT INTO "user" ( "username", "password", "first_name", "last_name", "role", "block_id", "shift_timeframe", "pay_rate")
VALUES 
( 'Josh11', '11', 'Josh', 'K', 'ERT', 1, 'day', 17.50),
( 'Caleb22', '22', 'Caleb', 'M', 'ERT', 2, 'day', 17.50),
( 'Sarah33', '33', 'Sarah', 'F', 'ERT', 1, 'eve', 17.50),
( 'Minh44', '44', 'Minh', 'P', 'ERT', 2, 'eve', 17.50),
( 'Kyle55', '55', 'Kyle', 'C', 'ERT', 1, 'nht', 17.50),
( 'Kallie66', '66', 'Kallie', 'Z', 'ERT', 2, 'nht', 17.50);

---------------------------- TEST DATA -----------------------------------------------------------------
