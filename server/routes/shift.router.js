const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// ===============================================< P i c k u p   S h i f t >===============================================
// Update route for pickup shifts
router.put('/pickup/:staffId/:shiftId',  (req, res) => {
  let shiftTakersId = req.params.staffId;
  let shiftId = req.params.shiftId
  console.log('pickup request for user/shift', shiftTakersId, shiftId);

  const pickupQuery = `UPDATE "schedule"
  SET "request" = NULL, "staff_id" = $1
  WHERE "id"=$2;`;

  pool.query(pickupQuery, [shiftTakersId, shiftId])
  .then(response => {
    res.sendStatus(201)
  }).catch(error => {
    res.sendStatus(500)
  })
})// -------------------------------------------<  E N D   P i c k u p   S h i f t  >------------------------------------------------


// =================================================<  S i c k   C a l l  >=================================================
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
});// -------------------------------------------<  E N D   S i c k   C a l l  >------------------------------------------------

// ===========================================<  G i v e a w a y   s h i f t  >===========================================
router.post('/giveaway', async (req, res) => {
  console.log('inside giveaway, req.body is:', req.body);
  let shift = req.body


  if(req.user.id != shift.staff_id){
    console.log('in schedule router, user ID does not match myId');
    // res.sendStatus(403) /// This is currently disabled so it doesn't accidentally hinder my presentation
  }
  // else{ /// This is currently disabled so it doesn't accidentally hinder my presentation

  const connection = await pool.connect();
  console.log('connection initiated (1/2)');

  try {
    await connection.query('BEGIN');

    // First we post this request to the log
    const sqlText = `INSERT INTO "request_log" ("employee_id", "date_id", "req_shift_id", "req_date","req_shift_time", "type")
    VALUES ($1, $2, $3, $4, $5, 'giveaway');`;
  
    await connection.query(sqlText, [shift.staff_id, shift.id, shift.shift_id, shift.calendar_date, shift.shift_time])


    // Next we can update the staffing sheet to show the shift is being requested off
    const giveawayTxt = `UPDATE "schedule"
    SET "request" = 'giveaway'
    WHERE "id"=$1;`;

    await connection.query(giveawayTxt, [shift.shift_id]);

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
// } // End of Else statement // currently disabled
}); // -------------------------------------------<  E N D   G i v e a w a y   s h i f t  >------------------------------------------------

module.exports = router;