const debug = require('debug')('app:startup');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const expressMongoDb = require('express-mongo-db');// to remove req.db.collection? or something like that.
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const auth = require('./auth');

// plugin added by user
const expressValidator = require('express-validator');

// route files
const index = require('./routes/index');
const item = require('./routes/item');
const add = require('./routes/add');
const edit = require('./routes/edit');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
var hbs = require('express-hbs');
var functions = require("./functions");

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    defaultLayout:path.join(__dirname, "views/layout.hbs"),
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
functions.hbsHelper();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressMongoDb(process.env.DB_URI));// to remove req.db.collection? or something like that.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ url: process.env.DB_URI }),
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
// to validate easily
app.use(expressValidator());

// TODO: MEMO! user is from here
app.use(function(req, res, next) {
  // always make req.user available to the template
  res.locals.user = req.user;
  next();
});

// route use setting
app.use('/', item);
app.use('/', index);
app.use('/add', add);
app.use('/edit', edit);


app.use('/', auth.router);

/*app.get('/protected', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('protected');
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

debug(`app.js loaded`);

module.exports = app;
