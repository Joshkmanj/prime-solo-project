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

  .then(result =>{
    res.send(result.rows[0])
  }).catch(error => {
    console.log('error:', error);
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