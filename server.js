var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()
require("./config/database");
require("./config/passport");
require("./config/multer")
// require("./config/cloudinary")

const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');

/////////////////////////////image storage

cloudinary.config({
    cloud_name: "dmp9qezbe",
    api_key: "936383818447884",
    api_secret: "a7r4sI4YlPsAcVWyo9Piqd-E2Zw",
  });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });
////////////////////////////image storage


//routers
const indexRouter = require('./routes/index');
const entryRouter = require("./routes/entries")
const commentRouter = require("./routes/comments")
// const multerRouter = require("./routes/multer")
const app = express();

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

// app.use(multer({dest:'./uploads/'}).single('image'))
//////////////////////////////////multer use

// app.post("/", upload.single("picture"), async (req, res) => {
//   return res.json({ picture: req.file.path });
// });
/////////////////////////////////multer use


app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/entries", entryRouter)
app.use("/", commentRouter)
app.use("/", multerRouter)


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
