var express = require('express');
var router = express.Router();

/* GET statistics listing. */
router.get('/', function(req, res, next) {
  res.send('hello world from statistics');
});

module.exports = router;
