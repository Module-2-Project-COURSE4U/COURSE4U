const Course = require('../models/Course');
const router = require('express').Router();

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  res.redirect('/courses');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/terms_privacy', (req, res, next) => {
  res.render('terms_privacy');
});

router.get('/checkout', (req, res, next) => {
  res.render('checkout');
});

module.exports = router;
