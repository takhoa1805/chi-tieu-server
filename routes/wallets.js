var express = require('express');
var router = express.Router();

/* GET wallets listing. */
router.get('/', function(req, res, next) {
  res.send('hello world from wallets');
});

module.exports = router;
