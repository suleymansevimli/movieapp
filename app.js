const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// middleware
const verifyToken = require('./middleware/verify-token')

const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');
const directorRouter = require('./routes/director');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken)
app.use('/api/movie', movieRouter);
app.use('/api/director', directorRouter);


mongoose.connect(
  'mongodb+srv://' + 'suleyman' + ':' + 'sevimli' + '@nodeapi-0ihsw.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
mongoose.Promise = global.Promise;


// config 
const config = require('./config')
app.set('api_secret_key', config.api_secret_key)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
