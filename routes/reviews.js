const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { isLoggedIn, isUser } = require("../middleware/adminLoggedIn");
// // @desc    create a review
// // @route   POST
// // @access  User
router.post('/newReview/:courseId', isLoggedIn, async function (req, res, next) {
  const { stars, comment } = req.body;
  const { username } = req.session.currentUser;
  const { courseId } = req.params;
  try {
    await Review.create({ stars, comment, username, course: courseId });
    res.redirect(`/courses/${courseId}`);
  } catch (error) {
    next(error)
  }
});
// // @desc    Delete a review
// // @route   GET 
// // @access  User
// no funciona
router.get("/:id/delete", isLoggedIn, async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  const user = req.session.currentUser;
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.render(`/courses/course-details/${review._id}`, { user });
  } catch (error) {
    next(error);
  }
});



module.exports = router;