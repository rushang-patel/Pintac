const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user'); // Import the User model
const Pin = require('../models/pin');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const pins = await Pin.find();
    res.render('index', { title: 'Pintac', user: req.user, pins });
  } catch (error) {
    console.error('Error retrieving pins:', error);
    res.status(500).json({ error: 'Server error' });
  }
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
    successRedirect: '/',
    failureRedirect: '/login'
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
