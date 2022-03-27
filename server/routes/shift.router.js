const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Update route for sick calls
router.put('/sick/:id', (req, res) => {
  // let staffId = req.user.id
  let shiftId = req.params.id
    
  const queryText = `UPDATE "schedule" 
    SET "staff_id" = NULL
    WHERE "id"=$1;`;
  
    pool.query(queryText, [shiftId])
    .then(response =>{
      res.sendStatus(201)
    }).catch(error =>{
      res.sendStatus(500)
    })
});

// Post route for putting a shift up for giveaway
router.post('/giveaway', (req, res) => {
  console.log('inside giveaway, req.body is:', req.body);
  // let userId = req.user.id
  let shift = req.body

  const sqlText = `INSERT INTO "requests" ("employee_id", "date_id", "req_shift_id", "req_date","req_shift_time", "type")
  VALUES ($1, $2, $3, $4, $5, $6);`;

  pool.query(sqlText, [shift.staff_id,shift.id,shift.shift_id,shift.calendar_date,shift.shift_time,shift.type])
  .then(response =>{
    res.sendStatus(201)
  }).catch(error =>{
    console.log('Shift giveaway error:', error);
    res.sendStatus(500)
  })
});

module.exports = router;