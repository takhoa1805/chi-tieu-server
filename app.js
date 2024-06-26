const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transactions');
const walletsRouter = require('./routes/wallets');
const statisticsRouter = require('./routes/statistics');
const savingsRouter = require('./routes/savings');


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statistics',statisticsRouter);
app.use('/transactions',transactionsRouter);
app.use('/wallets',walletsRouter);
app.use('/savings',savingsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



// READING https://viblo.asia/p/tim-hieu-ve-json-web-token-jwt-7rVRqp73v4bP
// https://viblo.asia/p/jwt-va-ung-dung-cua-no-vyDZOMRk5wj
// https://viblo.asia/p/jwt-va-cac-ky-thuat-khai-thac-phan-1-maGK7rRB5j2
// IMPLEMENTING JSONWEBTOKEN STUFF https://www.npmjs.com/package/jsonwebtoken
