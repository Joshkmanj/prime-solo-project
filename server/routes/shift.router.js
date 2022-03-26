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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;