const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/calendar/:id', (req, res) => {
  console.log('req.user is', req.user);
  let personId = req.params.id

  const sqlQueryText = `SELECT "cs"."day_number" AS "id", "cs"."calendar_date", to_char("cs"."calendar_date", 'FMMM/FMDD') AS "abrv_date","cs"."week_number", "cs"."week_day_name",
  "sc"."staff_id", "sc"."shift_time", "sc"."id" AS "shift_id"
  FROM "calendar_structure" AS "cs"
  LEFT JOIN (SELECT * FROM "schedule" WHERE "staff_id" = $1) AS "sc"
  ON "cs"."calendar_date" = "sc"."date"
  WHERE "week_number" > 8 AND "week_number" < 20
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
});

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
});

// Shift trade logic. Some updating can be done after initial demonstration.
router.post('/trade', async (req, res) => {
  // POST route code here
  const myId = req.body.myId; // id of the person accepting the trade
  const partnerId = req.body.partnerId;  // id of who the employee is trading with
  const myShiftId = req.body.myShiftId;
  const theirShiftId = req.body.theirShiftId

  if(req.user.id != myId){
    console.log('in schedule router, user ID does not match myId');
    res.sendStatus(403)
  }else{
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
  }}
});

// router.update('/', async(req,res) => {

// })

module.exports = router;
