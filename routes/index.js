const Course = require('../models/Course');

const router = require('express').Router();

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  const user = req.session.currentUser;
  res.redirect('courses');
});

module.exports = router;
