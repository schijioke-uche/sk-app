const express = require('express');
const router = express.Router();
const pool = require('../db');
const format = require('pg-format');

router.get('/', (request, response, next) => {
  pool.query(
    'SELECT * FROM search_tables_u WHERE skill_rating > 0 OR want_to_learn=true',
    (err, res) => {
      if (err) return next(err);
      response.send(res.rows);
    }
  );
});

router.get('/:term', (request, response, next) => {
  const { term } = request.params;
  //If only want to search for category/name of skill
  // const query = `SELECT * FROM search_tables_u WHERE to_tsvector(name || ' ' || category) @@ to_tsquery($1) AND ( skill_rating > 0 OR want_to_learn=true )`;
  const query = `SELECT * FROM search_tables_u WHERE to_tsvector(name || ' ' || category || ' ' || first_name || ' ' || last_name) @@ to_tsquery($1) AND ( skill_rating > 0 OR want_to_learn=true )`;
  let queryTerm = term.split(' ').map((ch) => ch + ':*');
  queryTerm = queryTerm.join('<->');
  pool.query(query, [queryTerm], (err, res) => {
    if (err) return next(err);
    response.send(res.rows);
  });
});

module.exports = router;
