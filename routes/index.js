const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user'); // Import the User model

/* GET home page. */
router.get('/', function(req, res, next) {
  // Pass the title and user variables to the template
  res.render('index', { title: 'Pintac', user: req.user });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/Pintac',
    failureRedirect: '/Pintac'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/Pintac');
});

// User creation route
router.post('/users', async (req, res) => {
  try {
    const { userId, userName, email, avatar } = req.body;
    const user = new User({
      userId,
      userName,
      email,
      avatar
    });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;
