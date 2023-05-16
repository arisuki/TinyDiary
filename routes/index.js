var express = require('express');
var router = express.Router();
const passport = require('passport');

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: "select_account"
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
  res.render('index', { title: 'tiny_diary.txt' });
});

module.exports = router;