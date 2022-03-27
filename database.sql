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



---------------------------- TEST DATA ----------------------------------------------------------------------------------------
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

INSERT INTO "schedule" ("date", "staff_id", "shift_time")
VALUES 
('2/28/2022',1,'day'), ('3/1/2022',1,'day'), ('3/4/2022',1,'day'), ('3/5/2022',1,'day'), ('3/6/2022',1,'day'), ('3/9/2022',1,'day'), ('3/10/2022',1,'day'),('3/14/2022',1,'day'), ('3/15/2022',1,'day'), ('3/18/2022',1,'day'), ('3/19/2022',1,'day'), ('3/20/2022',1,'day'), ('3/23/2022',1,'day'), ('3/24/2022',1,'day'),
('3/2/2022',2,'day'), ('3/3/2022',2,'day'), ('3/7/2022',2,'day'), ('3/8/2022',2,'day'), ('3/11/2022',2,'day'), ('3/12/2022',2,'day'), ('3/13/2022',2,'day'),('3/16/2022',2,'day'), ('3/17/2022',2,'day'), ('3/21/2022',2,'day'), ('3/22/2022',2,'day'), ('3/25/2022',2,'day'), ('3/26/2022',2,'day'), ('3/27/2022',2,'day'),
('2/28/2022',3,'eve'), ('3/1/2022',3,'eve'), ('3/4/2022',3,'eve'), ('3/5/2022',3,'eve'), ('3/6/2022',3,'eve'), ('3/9/2022',3,'eve'), ('3/10/2022',3,'eve'),('3/14/2022',3,'eve'), ('3/15/2022',3,'eve'), ('3/18/2022',3,'eve'), ('3/19/2022',3,'eve'), ('3/20/2022',3,'eve'), ('3/23/2022',3,'eve'), ('3/24/2022',3,'eve'),
('3/2/2022',4,'eve'), ('3/3/2022',4,'eve'), ('3/7/2022',4,'eve'), ('3/8/2022',4,'eve'), ('3/11/2022',4,'eve'), ('3/12/2022',4,'eve'), ('3/13/2022',4,'eve'),('3/16/2022',4,'eve'), ('3/17/2022',4,'eve'), ('3/21/2022',4,'eve'), ('3/22/2022',4,'eve'), ('3/25/2022',4,'eve'), ('3/26/2022',4,'eve'), ('3/27/2022',4,'eve'),
('2/28/2022',5,'nht'), ('3/1/2022',5,'nht'), ('3/4/2022',5,'nht'), ('3/5/2022',5,'nht'), ('3/6/2022',5,'nht'), ('3/9/2022',5,'nht'), ('3/10/2022',5,'nht'),('3/14/2022',5,'nht'), ('3/15/2022',5,'nht'), ('3/18/2022',5,'nht'), ('3/19/2022',5,'nht'), ('3/20/2022',5,'nht'), ('3/23/2022',5,'nht'), ('3/24/2022',5,'nht'),
('3/2/2022',6,'nht'), ('3/3/2022',6,'nht'), ('3/7/2022',6,'nht'), ('3/8/2022',6,'nht'), ('3/11/2022',6,'nht'), ('3/12/2022',6,'nht'), ('3/13/2022',6,'nht'),('3/16/2022',6,'nht'), ('3/17/2022',6,'nht'), ('3/21/2022',6,'nht'), ('3/22/2022',6,'nht'), ('3/25/2022',6,'nht'), ('3/26/2022',6,'nht'), ('3/27/2022',6,'nht');

INSERT INTO "schedule" ("date", "staff_id", "shift_time")
VALUES 
('3/28/2022',1,'day'), ('3/29/2022',1,'day'), ('4/1/2022',1,'day'), ('4/2/2022',1,'day'), ('4/3/2022',1,'day'), ('4/6/2022',1,'day'), ('4/7/2022',1,'day'),('4/11/2022',1,'day'), ('4/12/2022',1,'day'), ('4/15/2022',1,'day'), ('4/16/2022',1,'day'), ('4/17/2022',1,'day'), ('4/20/2022',1,'day'), ('4/21/2022',1,'day'),
('3/30/2022',2,'day'), ('3/31/2022',2,'day'), ('4/4/2022',2,'day'), ('4/5/2022',2,'day'), ('4/8/2022',2,'day'), ('4/9/2022',2,'day'), ('4/10/2022',2,'day'),('4/13/2022',2,'day'), ('4/14/2022',2,'day'), ('4/18/2022',2,'day'), ('4/19/2022',2,'day'), ('4/22/2022',2,'day'), ('4/23/2022',2,'day'), ('4/24/2022',2,'day'),
('3/28/2022',3,'eve'), ('3/29/2022',3,'eve'), ('4/1/2022',3,'eve'), ('4/2/2022',3,'eve'), ('4/3/2022',3,'eve'), ('4/6/2022',3,'eve'), ('4/7/2022',3,'eve'),('4/11/2022',3,'eve'), ('4/12/2022',3,'eve'), ('4/15/2022',3,'eve'), ('4/16/2022',3,'eve'), ('4/17/2022',3,'eve'), ('4/20/2022',3,'eve'), ('4/21/2022',3,'eve'),
('3/30/2022',4,'eve'), ('3/31/2022',4,'eve'), ('4/4/2022',4,'eve'), ('4/5/2022',4,'eve'), ('4/8/2022',4,'eve'), ('4/9/2022',4,'eve'), ('4/10/2022',4,'eve'),('4/13/2022',4,'eve'), ('4/14/2022',4,'eve'), ('4/18/2022',4,'eve'), ('4/19/2022',4,'eve'), ('4/22/2022',4,'eve'), ('4/23/2022',4,'eve'), ('4/24/2022',4,'eve'),
('3/28/2022',5,'nht'), ('3/29/2022',5,'nht'), ('4/1/2022',5,'nht'), ('4/2/2022',5,'nht'), ('4/3/2022',5,'nht'), ('4/6/2022',5,'nht'), ('4/7/2022',5,'nht'),('4/11/2022',5,'nht'), ('4/12/2022',5,'nht'), ('4/15/2022',5,'nht'), ('4/16/2022',5,'nht'), ('4/17/2022',5,'nht'), ('4/20/2022',5,'nht'), ('4/21/2022',5,'nht'),
('3/30/2022',6,'nht'), ('3/31/2022',6,'nht'), ('4/4/2022',6,'nht'), ('4/5/2022',6,'nht'), ('4/8/2022',6,'nht'), ('4/9/2022',6,'nht'), ('4/10/2022',6,'nht'),('4/13/2022',6,'nht'), ('4/14/2022',6,'nht'), ('4/18/2022',6,'nht'), ('4/19/2022',6,'nht'), ('4/22/2022',6,'nht'), ('4/23/2022',6,'nht'), ('4/24/2022',6,'nht');
---------------------------- TEST DATA ----------------------------------------------------------------------------------------



--------------------------------- Database Queries -------------------------------------
SELECT * FROM "user"
WHERE "user"."id" = 1;-- GET user data from ID


SELECT "id", "shift_time",
to_char("date", 'FMMM/FMDD') AS "date",
to_char("date", 'Day') AS "week_day_name",
to_char("date", 'IW') AS "week_num"
FROM "calendar"
WHERE "staff_id" = 1
ORDER BY to_char("date", 'YY/MM/DD');-- GET calendar/weekday/week-number schedule from ID and ordered by date value

SELECT "user"."first_name"
FROM "user"
JOIN "calendar" ON "user"."id"="calendar"."staff_id"
WHERE "calendar"."date"='3/4/2022';--GET users that are working this day
--------------------------------- Database Queries -------------------------------------

