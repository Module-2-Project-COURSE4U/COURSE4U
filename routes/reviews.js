const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

/* POST new review */
/* ROUTE /reviews/new/:showId */
router.post('/newCourse/:courseId', async function (req, res, next) {
  const { stars, comment } = req.body;
  const { username } = req.session.currentUser;
  const { courseId } = req.params;
  try {
    await Review.create({ stars, comment, username, course: courseId });
    res.redirect('/courses/course-details');
  } catch (error) {
    next(error)
  }
});

module.exports = router;