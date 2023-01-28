const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
// const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// @desc    Displays form view to sign up
// @route   GET /auth/signup
// @access  PublicisLoggedOut
router.get('/signup', async (req, res, next) => { const user = req.session.currentUser;
  res.render('auth/signup');
});

// @desc    Displays form view to log in
// @route   GET /auth/login
// @access  Public
router.get('/login', async (req, res, next) => {  const user = req.session.currentUser;
  res.render('auth/login');
})

// @desc    Sends user auth data to database to create a new user
// @route   POST /auth/signup
// @access  Public
router.post('/signup', async (req, res, next) => {
  const { email, password, username } = req.body;
  // ⚠️ Add validations!
  // Check that username, email, and password are provided
  if (!username || !password) {
    res.render('auth/signup', { error: 'All fields are necessary!' });
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
  if (!regex.test(password)) {
    res.render('auth/signup', {error: 'Password needs to contain at lesat 7 characters, one number, one lowercase an one uppercase letter.'})
    return;
  }
  try {
    const findUserInDB = await User.findOne({username: username});
    if (findUserInDB ) {
      res.render('auth/signup', { error: `There alredy is a user with username ${username}` });
      return
    } else {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, hashedPassword });
    res.render('auth/login', user);
  }
 } catch (err) {
    next(err)
  }
});

// @desc    Sends user auth data to database to authenticate user
// @route   POST /auth/login
// @access  Public
router.post('/login', async  (req, res, next) => {
  const { email, password } = req.body;
  // ⚠️ Add validations!
  if (!email | !password) {
    res.render('auth/login', { error: 'username or password do not match' });
    return;
  }
  try {
    const findUserInDB = await User.findOne({ email: email });
    if (!findUserInDB) {
      res.render('auth/login', { error: "User not found" });
      return;
    } else {
      const match = await bcrypt.compare(password, findUserInDB.hashedPassword);
      if (match) {
        // Remember to assign user to session cookie:
        req.session.currentUser = findUserInDB;
        const user = req.session.currentUser;
        res.redirect('/');
      } else {
        res.render('auth/login', { error: "Unable to authenticate user" });
        return;
      }
    }
  } catch (err) {
    next(err);
  }
});

// @desc    Destroy user session and log out
// @route   POST /auth/logout
// @access  Private 
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.clearCookie('COURSE4U')
      res.redirect('auth/login');
    }
  });
});

module.exports = router;
