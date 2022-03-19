const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
  // This collects the user's ID from the GET request params
  let userId= req.params.id 
  // Line up the query text to be sent off
  const queryText = `SELECT 
  "id",
  "shift_time",
  to_char("date", 'FMMM/FMDD') AS "shift_date",
  to_char("date", 'Day') AS "week_day_name",
  to_char("date", 'IW') AS "week_number",
  to_char(current_timestamp, 'IW') AS "current_week_number"
  FROM "calendar"
  WHERE "staff_id" = $1
  ORDER BY to_char("date", 'YY/MM/DD');`;

  // The query text is sent to the database with a sanitized input
  pool.query(queryText, [userId])
  .then((response)=>{
    // console.log('response:',response.rows); // test log for when new queries are being tested.
    res.send(response.rows)
  }).catch((error)=>{
    console.log('Database error:', error);
    res.sendStatus(500)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
