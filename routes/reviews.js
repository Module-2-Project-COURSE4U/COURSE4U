const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const Review = require("../models/Review");
const { isLoggedIn, isAdmin,  isUser } = require("../middleware/adminLoggedIn");

// @desc    create a review
// @route   POST
// @access  User
router.post(
  "/newReview/:courseId",
   
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
      // if(stars==0){
      //   res.re
      // }
      await Review.findByIdAndUpdate(review._id, {
        $push: { username: user_id },
      });
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
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.redirect("/courses");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
