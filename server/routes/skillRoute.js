const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM skills', (err, res) => {
    if (err) return next(err);
    console.log(`Response Length: ${res.rows}`);
    response.json(res.rows);
  });
});

module.exports = router;
