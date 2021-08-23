const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', (request, response, next) => {
  pool.query(
    'SELECT email, first_name, last_name FROM employees WHERE is_manager = true',
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

module.exports = router;
