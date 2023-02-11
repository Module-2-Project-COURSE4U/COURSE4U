const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Review = require("../models/Review");
const { isLoggedIn, isUser } = require("../middleware/adminLoggedIn");

// @desc    create a review
// @route   POST
// @access  User
router.post(
  "/newReview/:courseId",
  isLoggedIn,
  async function (req, res, next) {
    const user_id = req.session.currentUser._id;
    const { stars, comment } = req.body;
    const { courseId } = req.params;
    try {
      const review = await Review.create({
        stars,
        comment,
        course: courseId,
      });
      await Review.findByIdAndUpdate(review._id, { $push: { username: user_id } });
      res.redirect(`/courses/course-details/${courseId}`);
    } catch (error) {
      next(error);
    }
  }
);
// @desc    Delete a review
// @route   GET
// @access  User
router.get("/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  const user = req.session.currentUser;
  try {
    const review = await Review.find({ course: id }, { username: user });
    res.redirect("/courses");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
