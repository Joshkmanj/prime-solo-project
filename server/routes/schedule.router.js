const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// =======================================<  G e t  C a l e n d a r  >===============================================
router.get('/calendar/:id', (req, res) => {
  // console.log('req.user is', req.user);
  let personId = req.params.id

  const sqlQueryText = `SELECT "cs"."day_number" AS "id", "cs"."calendar_date", to_char("cs"."calendar_date", 'FMMM/FMDD') AS "abrv_date","cs"."week_number", "cs"."week_day_name",
  "sc"."staff_id", "sc"."shift_time", "sc"."id" AS "shift_id"
  FROM "calendar_structure" AS "cs"
  LEFT JOIN (SELECT * FROM "schedule" WHERE "staff_id" = $1) AS "sc"
  ON "cs"."calendar_date" = "sc"."date"
  WHERE "week_number" >= (to_char(current_timestamp, 'IW')::int) AND "week_number" < (to_char(current_timestamp, 'IW')::int + 10)
  ORDER BY "cs"."calendar_date";`

  // The query text is sent to the database with a sanitized input
  pool.query(sqlQueryText, [personId])
    .then((response) => {
      // console.log('response:',response.rows); // test log for when new queries are being tested.
      res.send(response.rows)
    }).catch((error) => {
      console.log('Database error:', error);
      res.sendStatus(500)
    })
});// ----------------------------------<  E N D   G e t   C a l e n d a r  >----------------------------------------

// =====================================<  G e t   M y   S h i f t s  >===============================================
// Gets a user's scheduled shifts based off their ID.
router.get('/user/:id', (req, res) => {
  // This collects the user's ID from the GET request params
  let userId = req.params.id

  // Line up the query text to be sent off
  const queryText = `SELECT 
  "id",
  "shift_time",
  "date" AS "full_date",
  to_char("date", 'FMMM/FMDD') AS "shift_date",
  to_char("date", 'FMDay') AS "week_day_name",
  to_char("date", 'IW') AS "week_number",
  to_char(current_timestamp, 'IW') AS "current_week_number"
  FROM "schedule"
  WHERE "staff_id" = $1
  ORDER BY to_char("date", 'YY/MM/DD');`;

  // The query text is sent to the database with a sanitized input
  pool.query(queryText, [userId])
    .then((response) => {
      // console.log('response:',response.rows); // test log for when new queries are being tested.
      res.send(response.rows)
    }).catch((error) => {
      console.log('Database error:', error);
      res.sendStatus(500)
    })
});// ----------------------------------<  E N D   G e t   M y   S h i f t s  >-----------------------------------------


// =====================================<  G e t  O p e n  S h i f t s  >===============================================
router.get('/open-shifts/:userId', (req, res) => {
  let employeeId = req.params.userId
  // let openShiftType = req.params.type

  // Then we collect the shift requests.
  const openShiftQuery = `SELECT "sc"."id" AS "id", "cs"."calendar_date", to_char("cs"."calendar_date", 'FMMM/FMDD') AS "abrv_date","cs"."week_number", 
      "cs"."week_day_name", "sc"."staff_id", "sc"."shift_time", "sc"."id" AS "shift_id", "sc"."request", "user"."first_name", "user"."last_name"
      FROM "schedule" AS "sc"
      JOIN "calendar_structure" AS "cs"
      ON "cs"."calendar_date" = "sc"."date"
      LEFT JOIN "user"
      ON "sc"."staff_id" = "user"."id"
      WHERE "request" IS NOT NULL AND ("staff_id" != $1 OR "staff_id" IS NULL) AND "calendar_date" > current_date
      ORDER BY "cs"."calendar_date", "shift_time";`;

  // This gets the open shifts
  pool.query(openShiftQuery, [employeeId])

    .then(response => {
      // console.log('Getting open shifts, response:', response.rows);
      res.send(response.rows)
    }).catch(error => {
      console.log('Error getting open shifts:', error);
    })
});// ----------------------------------<  E N D  G e t  O p e n  S h i f t s  >-----------------------------------------


// =====================================<  S h i f t   T r a d e  >===============================================
// Shift trade logic. Some updating can be done after initial demonstration.
router.post('/trade', async (req, res) => {
  // POST route code here
  const myId = req.body.myId; // id of the person accepting the trade
  const partnerId = req.body.partnerId;  // id of who the employee is trading with
  const myShiftId = req.body.myShiftId;
  const theirShiftId = req.body.theirShiftId

  if (req.user.id != myId) {
    console.log('in schedule router, user ID does not match myId');
    res.sendStatus(403)
  } else {
    // WE NEED TO USE THE SAME CONNECTION FOR ALL QUERIES!!!!
    const connection = await pool.connect(); // THIS ISN'T JUST AN INSTANCE, YOU'RE MAKING A CONNECTION THAT HAS TO BE RELEASED EVENTUALLY!!
    console.log('connection initiated (1/2)');

    // This is going to be basic javascript "try"/"catch"
    try {
      // Here we start the transaction with a "BEGIN"
      await connection.query('BEGIN');

      // Here's the SQL text that'll be used for both transactions.
      const sqlText = `UPDATE "schedule"
    SET "staff_id" = $1
    WHERE "id" = $2;`;

      // This assigns the user's ID to the other person's shift
      await connection.query(sqlText, [myId, theirShiftId]);

      // this assigns the coworker's Id to the user's shift
      await connection.query(sqlText, [partnerId, myShiftId]);

      // Lastly we need code that says "commit" to complete the transaction.
      await connection.query('COMMIT');

      // Returning success code to the client
      res.sendStatus(200)
    } catch (error) {
      // In case of transaction failure, the changes are rolled back
      await connection.query('ROLLBACK');

      // Sending error messages to the server and client
      console.log('transaction error! Rolling back!', error);
      res.sendStatus(500);

    } finally {
      // "Finally" always runs, both after a succesful try, and after a catch
      // This will put the client connection back in the pool.
      // THIS IS VERY IMPORTANT, OTHERWISE YOU WON'T BE ABLE TO MAKE ANY MORE QUERIES!!
      connection.release(); /// YOU HAVE TO RELEASE AFTER YOU'VE CONNECTED
      console.log('connection released (2/2)');
    }
  }
});// ----------------------------------<  E N D   S h i f t   T r a d e  >-----------------------------------------

// =======================================<  G e t   T o d a y 's   D a t e  >===============================================
router.get('/today', (req, res) => {

  const todaysDateQuery = `SELECT array_remove(array["mo1","tu1","we1","th1","fr1","sa1","su1",
  "mo2","tu2","we2","th2","fr2","sa2","su2",
  "mo3","tu3","we3","th3","fr3","sa3","su3"], NULL) as "shift_array"
  FROM "block"
  WHERE "id" = 3;`;

  // The query text is sent to the database with a sanitized input
  pool.query(todaysDateQuery)
    .then((response) => {
      console.log('response:', response.rows[0].shift_array); // test log
      res.send(response.rows[0].shift_array)
    }).catch((error) => {
      console.log('Database error:', error);
      res.sendStatus(500)
    })
});// ----------------------------------<  E N D   G e t   T o d a y 's   D a t e  >----------------------------------------


module.exports = router;
