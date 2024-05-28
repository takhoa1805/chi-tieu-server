var express = require('express');
var router = express.Router();

/* GET statistics listing. */
router.get('/', function(req, res, next) {
  res.send('RETURN ALL MONEY SPENT THIS DAY/MONTH/WEEK/YEAR');
});

module.exports = router;
