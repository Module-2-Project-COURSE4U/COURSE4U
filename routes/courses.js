const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const Review = require("../models/Review");
const Content = require("../models/Content");
const Features = require("../models/Features");
const Offered = require("../models/Offered");
const Reasons = require("../models/Reasons");
const { isAdmin, isLoggedIn, isUser } = require("../middleware/adminLoggedIn");

// @desc    App courses page, GET ALL COURSES
// @route   GET /
// @access  SemiPublic (Can see part of the info)
router.get("/", async function (req, res, next) {
  const user = req.session.currentUser;
  try {
    const courses = await Course.find({}).sort({ title: 1 });
    // it maps each course object and truncates its description property to show only the first 100 lines by splitting the string by newline characters and rejoining the first 100 lines.
    const truncatedCourses = courses.map((course) => {
      course.description = course.description
        .split("\n")
        .slice(0, 100)
        .join("\n");
      return course;
    });
    res.render("course/courseView", { courses: truncatedCourses, user });
  } catch (error) {
    next(error);
  }
});
// @desc    Search for course results
// @route   GET /
// @access  Public
router.get("/search", async function (req, res, next) {
  const user = req.session.currentUser;
  const { title } = req.query;
  try {
    const course = await Course.findOne({ title: title });
    res.render("course/search", { query: title, course });
  } catch (error) {
    next(error);
  }
});


//@desc  view course details  by Id
/* @route GET 
/* @access Public*/
router.get("/course-details/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid course ID" });
    }
    const course = await Course.findById(id)
      .populate("offered")
      .populate("features")
      .populate("reasons")
      .populate("content");
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    return res.render("course/course-details", { course });
    } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Server error" });
  }
});

// Display to Edit routes page (edit-movie.hbs)

router.get("/editCourse/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid course ID" });
    }
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    return res.render("course/editCourse", { course });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Server error" });
  }
});



/* GET one show */
/* ROUTE /shows/:showId */
// router.get("/:courseId", async function (req, res, next) {
//   const { courseId } = req.params;
//   const user = req.session.currentUser;
//   try {
//     const course = await Course.findById(courseId).populate(
//       "Feature",
//       "Reason",
//       "Content",
//       "Skills",
//       "Offered"
//     );
//     const reviews = await Review.find({ course: courseId });
//     res.render("details", { course, reviews, user });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
