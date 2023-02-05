// const Course = require('../models/Course');
const router = require('express').Router();

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  res.redirect('/courses');
});

module.exports = router;
