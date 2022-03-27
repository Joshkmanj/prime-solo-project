const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/open-shifts/:type', async (req, res) => {
  let userId = req.user.id
  let openShiftType = req.params.type

  if (openShiftType === 'trade') { // If a user is just looking for a shift trade, they only need one sql query
    const sqlQuery = `SELECT *, to_char("req_date", 'FMDay') AS "week_day_name", to_char("req_date", 'FMMM/FMDD') AS "abrv_date"
    FROM "requests"
    WHERE "employee_id" != $1 AND "type" = 'trade';`;

    pool.query(sqlQuery, [userId])

  } else if (openShiftType === 'pickup') { // If the user is looking for a shift to pickup, they'll recieve the shifts in a more complicated manner

    // WE NEED TO USE THE SAME CONNECTION FOR ALL QUERIES!!!!
    const connection = await pool.connect(); // THIS ISN'T JUST AN INSTANCE, YOU'RE MAKING A CONNECTION THAT HAS TO BE RELEASED EVENTUALLY!!
    console.log('connection initiated (1/2)');

    // This is going to be basic javascript "try"/"catch"
    try {
      // Here we start the transaction with a "BEGIN"
      await connection.query('BEGIN');

      // First we get the sick calls.
      const sickCallsQuery = `SELECT *
    FROM "schedule"
    WHERE "staff_id" IS NULL;`;

      // Then we collect the shift requests.
      const openShiftQuery = `SELECT *, to_char("req_date", 'FMDay') AS "week_day_name", to_char("req_date", 'FMMM/FMDD') AS "abrv_date"
    FROM "requests"
    WHERE "employee_id" != $1 AND "type" = 'trade';`;

      // This gets the sick calls
      await connection.query(sickCallsQuery);
      // This gets the open shifts
      await connection.query(openShiftQuery, [userId]);

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

  const sqlQuery = `SELECT *, to_char("req_date", 'FMDay') AS "week_day_name", to_char("req_date", 'FMMM/FMDD') AS "abrv_date"
  FROM "requests"
  WHERE "employee_id" != $1 AND "type" = $2;`;

  pool.query(sqlQuery, [userId, openShiftType])
});

// Update route for sick calls
router.put('/sick/:staffId', async (req, res) => {
  let sickShiftId = req.body.shift_id
  let sickStaffId = req.params.staffId

  console.log('sick shift is:', sickShiftId);

  // WE NEED TO USE THE SAME CONNECTION FOR ALL QUERIES!!!!
  const connection = await pool.connect(); // THIS ISN'T JUST AN INSTANCE, YOU'RE MAKING A CONNECTION THAT HAS TO BE RELEASED EVENTUALLY!!
  console.log('sick-call connection initiated (1/2)');

  // This is going to be basic javascript "try"/"catch"
  try {// Here we start the transaction with a "BEGIN"
    await connection.query('BEGIN');

    // SQL to remove employee from schedule
    const sickCallQuery = `UPDATE "schedule"
    SET "request" = 'call in', "staff_id" = NULL
    WHERE "id"=$1;`;

    await connection.query(sickCallQuery, [sickShiftId]);


    // SQL to update employee's PTO
    const ptoQuery = `UPDATE "user"
    SET "PTO" = ("PTO" - 8)
    WHERE "id"=$1
    RETURNING "PTO" AS "sick_leave";`;

    // We want to save the result so we can get the returned value
    const result = await connection.query(ptoQuery, [sickStaffId]);
    let sick_leave = result.rows[0].sick_leave; // This captures the PTO value!!!!
    console.log('PTO amount is:', sick_leave);

    if (sick_leave < 0) {// SQL to fire an employee
      const removeEmployeeQuery = `UPDATE "schedule"
    SET "request" = 'fired', "staff_id" = NULL
    WHERE "staff_id"=$1;`
      await connection.query(removeEmployeeQuery, [sickStaffId]);

      const firedQuery = `DELETE FROM "user"
    WHERE "id" = $1
    RETURNING "first_name","last_name";`;

      // We want to save the result so we can get the returned value
      const firedResult = await connection.query(firedQuery, [sickStaffId]);
      let firedEmployee = { first_name: firedResult.rows[0].first_name, last_name: firedResult.rows[0].last_name }
      console.log('fired employee is:');
      console.log(firedEmployee); // Unfortunately the employees name is deleted before it can be retrieved and displayed
    } else if (sick_leave < 17) {
      console.log('Warning PTO is less than 17 hours');
    }

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
});

// Post route for putting a shift up for giveaway
router.post('/giveaway', (req, res) => {
  console.log('inside giveaway, req.body is:', req.body);
  // let userId = req.user.id
  let shift = req.body

  const sqlText = `INSERT INTO "requests" ("employee_id", "date_id", "req_shift_id", "req_date","req_shift_time", "type")
  VALUES ($1, $2, $3, $4, $5, $6);`;

  pool.query(sqlText, [shift.staff_id, shift.id, shift.shift_id, shift.calendar_date, shift.shift_time, shift.type])
    .then(response => {
      res.sendStatus(201)
    }).catch(error => {
      console.log('Shift giveaway error:', error);
      res.sendStatus(500)
    })
});

module.exports = router;