const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello world from users');
});


// SIGNIN REQUEST
// router.post('/signin', function(req, res, next) {
//   try{
//     const {email,password} = req.body;

//   } catch(data.error)
// });


module.exports = router;
