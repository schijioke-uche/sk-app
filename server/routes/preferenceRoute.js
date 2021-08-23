const express = require('express');
const router = express.Router();
const pool = require('../db');
const format = require('pg-format');

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM preference', (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get('/:employee_id', (request, response, next) => {
  const { employee_id } = request.params;
  const query = `SELECT skills.name, skills.skill_id, skills.category, preference.skill_rating, preference.want_to_learn, preference.altered_at
  FROM preference
  JOIN skills
  ON preference.skill_id = skills.skill_id
  WHERE preference.employee_id=($1)`;
  pool.query(query, [employee_id], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.post('/create_table', async (request, response, next) => {
  const { employee_id } = request.body;
  console.log(`EMPLOYEE! ${employee_id}`);
  pool
    .query(`SELECT skill_id FROM skills`)
    .then((results) => {
      let prefs = [];
      results.rows.forEach((item) => {
        prefs.push([employee_id, item.skill_id]);
      });
      let query = format(
        'INSERT INTO preference(employee_id, skill_id) VALUES %L',
        prefs
      );
      pool
        .query(query)
        .then((res) => {
          response.send(res.rows);
        })
        .catch((e) => {
          response.status(500).send({ message: 'server error', error: e });
        });
    })
    .catch((e) => {
      response.status(500).send({ message: 'server error', error: e });
    });
});

router.post('/', (request, response, next) => {
  let { skillRating, employee_id } = request.body;
  let prefs = [];
  for (let skill_id in skillRating) {
    const { rating, want_to_learn } = skillRating[skill_id];
    prefs.push([rating, want_to_learn, Number(skill_id), employee_id]);
  }
  const newUpdatePromise = (row) => {
    return new Promise((resolve, reject) => {
      const time = new Date().toISOString();
      pool.query(
        `UPDATE preference SET skill_rating=($1), want_to_learn=($2), altered_at=($3) WHERE skill_id=($4) AND employee_id=($5)`,
        [row[0], row[1], time, row[2], row[3]],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  };

  const promises = prefs.map((item) => {
    return newUpdatePromise(item);
  });

  Promise.all(promises)
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
