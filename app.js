var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');
var newsRouter = require('./routes/news');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

// automatycznie parsowanie danych z formmulatzrza
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// tu tylko przekazujemy nasz path zeby mozna bylo w szablonach miec to
app.use(function(req, res, next){
  // dzieki temu bd dostepne w szablonach ten path
  res.locals.path = req.path;
  console.log(res)
  // dzieki next sie nei zawiesi i przejdzie do nastepnego routingu
  next()
})

// to bedzie wywoalne na stronie glownej bo /

// wywolujemy te routery pod roznymi adresami
// tu tez dojdzie przez resp.locals.path bd w zmiennych w szablonach dostepne, NAPISANE WYZEJ  W USE
app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);


// na slash users
// app.use('/users', usersRouter);

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
