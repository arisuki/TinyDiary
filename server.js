var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()
require("./config/database");
require("./config/passport");
require("./config/multer")

const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

//multer const's
const multer = require('multer');

//routers
const indexRouter = require('./routes/index');
const entryRouter = require("./routes/entries")
const commentRouter = require("./routes/comments.js")

const app = express();

/////////////////////////
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, './uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// ////////////////////////


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// //multer stuff
// app.use(multer({
//   dest:'./uploads/',
//   rename: function (fieldname, filename){
//     return filename.replace(/\W+/g, '-').toLowerCase();
// }
// }).single('image'))
app.use(multer({dest:'./uploads/'}).single('image'))

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/entries", entryRouter)
app.use("/", commentRouter)


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
