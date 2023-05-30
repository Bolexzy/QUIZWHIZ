var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { router : indexRouter, admin } = require('./routes/index');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors({ origin: '*' }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//my helper func
async function getToken(request) {
  if (!request.headers.authorization) {
    return undefined;
  }
  const token =
    request.headers.authorization.replace(/^Bearer\s/, '');
  return token;
}

//Authorization route
app.use('/', async function authorizeUsers(req, res, next) {
  const token = await getToken(req)
  const payload = await admin.auth().verifyIdToken(token)

  if (payload) {
    //auth token valid
    req.quizwhiz_user = payload
    next();
  }
  else{
    // user does not exist
    res.status(401).json({status:'error',message:'Not authorized'})
  }
});

//add our routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.json({ status: 'error' });
});

module.exports = app;
