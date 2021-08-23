const express = require('express');
const router = express.Router();

router.get('/:term', (request, response, next) => {
  const { term } = request.params;
  response.send({ message: `Top Courses for ${term}` });
});

module.exports = router;
