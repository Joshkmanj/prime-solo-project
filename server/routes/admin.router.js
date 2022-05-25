const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get a user's block schedule
router.get('/:id', (req, res) => {
  scheduleId = req.params.id;

  const blockQuery = `SELECT "user"."shift_timeframe",
  "last_calendar_render", "next_calendar_render", "repetition_interval",
  array_remove(array["mo1","tu1","we1","th1","fr1","sa1","su1",
  "mo2","tu2","we2","th2","fr2","sa2","su2",
  "mo3","tu3","we3","th3","fr3","sa3","su3"], NULL) AS "block_schedule"
  FROM "block"
  JOIN "user" ON "block"."id" = "user"."block_id"
  WHERE "user"."id" = $1;`;

  pool.query(blockQuery, [scheduleId])

    .then(result => {
      res.send(result.rows[0])
    }).catch(error => {
      console.log('error:', error);
      res.sendStatus(500)
    })
});


router.post('/generator', async (req, res) => {

  console.log('inside generator function');

  const connection = await pool.connect();

  // This is going to be basic javascript 'try'/'catch'
  try {
    await connection.query('BEGIN');

    // -------------------------- SQL QUERIES -------------------------------
    const checkScheduleData = `SELECT "next_calendar_render", "last_calendar_render",
      CASE WHEN  (current_date + ("repetition_interval" - 12)) > "next_calendar_render" THEN TRUE WHEN (current_date + ("repetition_interval" - 12)) <= "next_calendar_render" THEN FALSE
      END AS "needs_rerender" FROM "block" ;`;

    const generateWorkersSchedules = `INSERT INTO "schedule" ("date", "staff_id", "shift_time") SELECT "date", "staff_id", "shift_time" FROM ( SELECT 
      generate_series(("next_calendar_render")::timestamp,("next_calendar_render" + ("repetition_interval" - 1))::timestamp,interval '1 day') AS "date"
      ,unnest(string_to_array(left(repeat(array_to_string(array["mo1","tu1","we1","th1","fr1","sa1","su1","mo2","tu2","we2","th2","fr2","sa2","su2","mo3","tu3","we3","th3","fr3","sa3","su3"],',')||',',3), (2 * "repetition_interval")-1 ), ',')) AS "working_today"
      ,"user"."id" AS "staff_id" ,"user"."shift_timeframe" AS "shift_time"
      FROM "block" JOIN "user" ON "block"."id" = "user"."block_id" ) AS "block_list" WHERE "working_today" = 't' ;`;

    const resetGenerationTrigger = `UPDATE "block" SET "last_calendar_render" = "next_calendar_render", "next_calendar_render" = "next_calendar_render" + "repetition_interval" ;`;
    // -------------------------- END SQL QUERIES -------------------------------

    // Check the schedule to see if it needs to be built out further.
    // We want to save the result so we can use logic with that result.
    const scheduleData = await connection.query(checkScheduleData);
    let needsRegenerating = scheduleData.rows[0].needs_rerender

    console.log('Needs regenerating =', needsRegenerating);

    if (needsRegenerating == false) {
      // If the calendar schedule doesn't need to be generated further, the queries can be commited and stop here.
      await connection.query('COMMIT');
      res.sendStatus(200);

    } else if (needsRegenerating == true) {
      // If the calendar needs to be generated further, the following code block is run

      // If yes, then continue on and build the calendar
      // await connection.query(generateWorkersSchedules);

      // After building the calendar, the calendar rendering trigger needs to be updated.
      await connection.query(resetGenerationTrigger);

      // Lastly we need code that says 'commit'
      await connection.query('COMMIT');
      res.sendStatus(200)
    } 
    else {
      console.log('ERROR! "needsRegenerating" returned to be neither true nor false, error in admin.router.js or in database.');
      res.sendStatus(500);
    } // End conditional SQL queries

  } catch (error) { // If there's an error, the following block runs.
    await connection.query('ROLLBACK');
    console.log('transaction error! Rolling back!', error);
    res.sendStatus(500);

  } finally {
    // 'Finally' always runs, both after a succesful try, and after a catch
    // This will put the client connection back in the pool.
    // THIS IS VERY IMPORTANT, OTHERWISE YOU WON'T BE ABLE TO MAKE ANY MORE QUERIES!!
    connection.release(); /// YOU HAVE TO RELEASE AFTER YOU'VE CONNECTED
  }
})// END POST request

module.exports = router;