// INCLUDING WISH LIST
// INCLUDING PERIODICALLY PAYMENTS

var express = require('express');
var router = express.Router();

/* GET transactions listing. */
router.get('/', function(req, res, next) {
  res.send('hello world from savings');
});

module.exports = router;
