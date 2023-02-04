const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Review = require('../models/Review');
const isLoggedIn = require("../middleware/isLoggedIn");

/* ROUTE /courses */
// @desc    App courses page, GET ALL COURSES
// @route   GET /
// @access  SemiPublic (Can see part of the info)
router.get('/', async function (req, res, next) {
  const user = req.session.currentUser;
    try {
      const courses = await Course.find({}).sort({ title: 1 });
      res.render('course/courseView',{ courses , user });
    } catch (error) {
      next(error)
    }
  });

/* ROUTE /courses/search */
// @desc    Search for course results
// @route   GET /
// @access  Public
router.get('/search', async function (req, res, next) {
    const { title } = req.query;
    try {
      const course = await Course.findOne({ title: title });
      res.render('course/search', { query: title, course });
    } catch (error) {
      next(error)
    }
  });

/* ROUTE /courses/:courseId */
// @desc    Get one course by Id
// @route   GET /
// @access  Public
router.get('/:courseId', async function (req, res, next) {
  const { courseId } = req.params;
  const user = req.session.currentUser;
  try {
    const course = await Course.findById(courseId);
    const reviews = await Review.find({ course: courseId });
    res.render('/coursedetails', { course, reviews, user });
  } catch (error) {
    next(error)
  }
});

module.exports = router;