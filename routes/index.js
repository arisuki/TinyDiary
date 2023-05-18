var express = require('express');
var router = express.Router();
const passport = require('passport');
const Entry = require("../models/entry");

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: "select_account"
    //COMMENT THIS BACK IN TO ENABLE GOOGLE ACCOUNT SELECTION
  }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get("/logout", function (req, res) {
  req.logout(function () {
    res.redirect("/");
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Entry.find({})
  .then((entries) => {
  res.render('index', {entries, title: 'tiny_diary.txt' });
})
})


module.exports = router;