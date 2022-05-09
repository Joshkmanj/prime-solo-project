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
DROP TABLE "request_log";
DROP TABLE "schedule";
DROP TABLE "calendar_structure";

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
"pay_rate" NUMERIC(5,2),
"image_path" VARCHAR(300),
"PTO" INT DEFAULT(30));

CREATE TABLE "calendar_structure" (
"id" SERIAL PRIMARY KEY,
"calendar_date" DATE,
"day_number" INT,
"week_number" INT,
"week_day_name" VARCHAR(11)
);

CREATE TABLE "schedule" (
"id" SERIAL PRIMARY KEY,
"date" DATE,
"calendar_id" INT REFERENCES "calendar_structure",
"staff_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
"shift_time" VARCHAR(40),
"request" VARCHAR(100)); ---- This represents the same value as the "shift_timeframe"
-- in the "user" table, name was changed to avoid potential mixups later on.

CREATE TABLE "request_log" (
"id" SERIAL PRIMARY KEY,
"employee_id" INT REFERENCES "user" ON DELETE CASCADE ON UPDATE CASCADE,
"date_id" INT REFERENCES "calendar_structure",
"req_shift_id" INT REFERENCES "schedule",
"req_date" DATE,
"req_shift_time" VARCHAR(40),
"type" VARCHAR(100)
);
----------------------- DATA TABLE SETUP ------------------------------------------------



---------------------------- TEST DATA ----------------------------------------------------------------------------------------
INSERT INTO "block" ("mo1","tu1","we1","th1","fr1","sa1","su1","mo2","tu2","we2","th2","fr2","sa2","su2")
VALUES 
(true, true, false, false, true, true, true, false, false, true, true, false, false, false),
(false, false, true, true, false, false, false, true, true, false, false, true, true, true);

SELECT "block".*
FROM "block"
JOIN "user" ON "block"."id" = "user"."block_id"
WHERE "user"."id" = 1
;

DELETE FROM "user" WHERE "id" =4;


INSERT INTO "user" ( "username", "password", "first_name", "last_name", "role", "block_id", "shift_timeframe", "pay_rate", "image_path")
VALUES 
( 'Josh11', '$2a$10$xqhRMhdoUeZxGxF9sRZo3OKNcPDw3xjAZrSB2oiY0STOm646ui1tK', 'Josh', 'K', 'ERT', 1, 'day', 17.50,'https://media-exp1.licdn.com/dms/image/C4E03AQGlycW9Vpes2w/profile-displayphoto-shrink_800_800/0/1647360104027?e=1652918400&v=beta&t=rBnpDU56XgPtE4XOBxYKGHvRK0JdU2VkudtdyU1TM98'),
( 'Caleb22', '$2a$10$mcqaZPwsVso8YRz.snwKrurDs7MwD3SIbz6ni4L.NWaku/QrFf9JG', 'Caleb', 'M', 'ERT', 2, 'day', 17.50,'https://media-exp1.licdn.com/dms/image/C5603AQENhdoZdV5FZQ/profile-displayphoto-shrink_200_200/0/1635112604958?e=1654128000&v=beta&t=f69ll31kgJDMaPn50nCu7-s-NG0oMwasduwkUyHtdLw');
INSERT INTO "user" ( "username", "password", "first_name", "last_name", "role", "block_id", "shift_timeframe", "pay_rate")
VALUES 
( 'Sarah33', '$2a$10$YRJNORjAZI/t4fcHi9GL1uM7c1OAMnrevhcbQTL0wHSh2D1GHpWzW', 'Sarah', 'F', 'ERT', 1, 'eve', 17.50),
( 'Minh44', '$2a$10$Gz0bjUrz0/AcQ9C/na5P6uoERS.tevMoXOXaR8grI7WZD4h682V1C', 'Minh', 'P', 'ERT', 2, 'eve', 17.50),
( 'Kyle55', '$2a$10$HtJopXY1L7dFx4VH3cj26OpTtK.L006t0AQp986nfteeXCXcM0Z1u', 'Kyle', 'C', 'ERT', 1, 'nht', 17.50),
( 'Kallie66', '$2a$10$lB3/1jVCHpopPRKEmE0wRuksoXvW2SEmTs3hyeart1x6nQTmTWTHW', 'Kallie', 'Z', 'ERT', 2, 'nht', 17.50);


INSERT INTO "calendar_structure" (SELECT
row_number() over (order by "gen_date") AS "id", 
"gen_date" AS "calendar_date",
--to_char("gen_date", 'FMMM/FMDD') AS "abrv_date",
to_char("gen_date", 'FMDDD')::INT AS "day_number",
--to_char("gen_date", 'IDDD') AS "ISO_day_number",
to_char("gen_date", 'FMIW')::INT AS "week_number",
to_char("gen_date", 'FMDay') AS "week_day_name"
FROM generate_series(
(date '2022-01-01')::timestamp,
(date '2022-12-31')::timestamp,
interval '1 day') AS "gen_date");


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


-- Experimental
--SELECT *, to_char("req_date", 'FMDay') AS "week_day_name", to_char("req_date", 'FMMM/FMDD') AS "abrv_date"
--FROM "requests"
--WHERE "employee_id" != 2;
-- Experimental



------------ Date Manipulation ------------
-- Gets you the date of the first monday of the current year
SELECT to_date(('1/'|| to_char(current_date,'IYYY')), 'IDDD/IYYY');

------------ BLOCK SCHEDULE ------------
-- Get relevant block schedule data for building schedule
SELECT "user"."shift_timeframe",
"last_calendar_render", "next_calendar_render", "repetition_interval",
array_remove(array["mo1","tu1","we1","th1","fr1","sa1","su1",
"mo2","tu2","we2","th2","fr2","sa2","su2",
"mo3","tu3","we3","th3","fr3","sa3","su3"], NULL) AS "block_schedule"
FROM "block"
JOIN "user" ON "block"."id" = "user"."block_id"
WHERE "user"."id" = 1;


----------------  Build the schedule for all staff members  --------------------
INSERT INTO "schedule" ("date", "staff_id", "shift_time")
SELECT "date", "staff_id", "shift_time"
FROM 
(SELECT -- This subquery attaches all necesary shift data for every calendar date
generate_series(
("next_calendar_render")::timestamp,
("next_calendar_render" + ("repetition_interval" - 1))::timestamp,
interval '1 day') AS "date",
(unnest(array_remove(array["mo1","tu1","we1","th1","fr1","sa1","su1",
"mo2","tu2","we2","th2","fr2","sa2","su2",
"mo3","tu3","we3","th3","fr3","sa3","su3"], NULL))) AS "block_schedule",
"user"."id" AS "staff_id",
"user"."shift_timeframe" AS "shift_time"

FROM "block"
JOIN "user" ON "block"."id" = "user"."block_id"
--WHERE "user"."id" = 1 -- This makes it a global shift update and not just for one employee!
) AS "subquery"
WHERE "block_schedule" = TRUE -- This filters the subquery so the employee only works on days specified by their block schedule.
;



------------ PAY PERIOD ------------
-- Generate list of dates from the "next_render_date" based off the "repetition_interval"
SELECT generate_series( 
"next_calendar_render",
"next_calendar_render" + ("repetition_interval" - 1),
interval '1 day') AS "generated_date"
FROM "block"
WHERE "id" = 3;

-- Get next pay period end
SELECT *
FROM "calendar_structure"
WHERE "iso_day_number" = 
		(SELECT MIN("iso_day_number") 
			FROM "calendar_structure"
			WHERE ("iso_day_number" % 14 = 0) AND "iso_day_number" >= to_char(current_date, 'IDDD')::int
			)--OR "iso_day_number" = 1
ORDER BY "id";

-- Get 