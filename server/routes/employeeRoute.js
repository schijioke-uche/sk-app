const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM employees ORDER BY employee_id ASC', (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get('/:email', (request, response, next) => {
  const { email } = request.params;
  pool.query(
    'SELECT * FROM employees WHERE email=($1)',
    [email],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});
router.get('/id/:employee_id', (request, response, next) => {
  const { employee_id } = request.params;
  pool.query(
    'SELECT * FROM employees WHERE employee_id=($1)',
    [employee_id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get('/getid/:email', (request, response, next) => {
  const { email } = request.params;
  pool.query(
    `SELECT employee_id FROM employees WHERE email=($1)`,
    [email],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get('/managers', (request, response, next) => {
  pool.query(`SELECT * FROM employees WHERE is_manager=true`, (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.post('/registration', (request, response, next) => {
  const { name, email } = request.body;
  const [first_name, last_name] = name.split(' ');
  const queryString = `INSERT INTO employees(first_name, last_name, email) 
  VALUES($1,$2,$3) ON CONFLICT(email) DO UPDATE SET first_name=($1),last_name=($2) RETURNING employee_id, first_name, last_name, email`;
  pool.query(queryString, [first_name, last_name, email], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.post('/', (request, response, next) => {
  const { employee_id } = request.body;
  const keys = ['role', 'manager', 'location', 'industry', 'language'];
  const fields = [];
  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE employees SET ${field}=($1) WHERE employee_id=($2)`,
      [request.body[field], employee_id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) response.json({ message: 'Saved' });
      }
    );
  });
});

module.exports = router;
