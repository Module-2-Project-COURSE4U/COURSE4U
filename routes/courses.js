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
      .populate("content")
      .populate("review");
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    for(let i=0;i<course.features.length;i++){
      (course.features[i]).svg = `/public/images/SVG/FEATURES/${i+1}.svg`
    }
    return res.render("course/course-details", { course });
    } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Server error" });
  }
});


// GET - Create Course Page
router.get("/newCourse", async (req, res, next) => {
  try {
    const offered = await Offered.find();
    const features = await Features.find();
    const reasons = await Reasons.find();
    const content = await Content.find();
    res.render("course/newCourse", { offered, features, reasons, content });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// router.get("/newCourse", function (req, res, next) {
// res.render("course/newCourse");
// });
// POST - Create Course
router.post("/newCourse", async function (req, res, next) {
  const { category, title, description, image, offered, features, reasons, content } = req.body;
  try {
    const newCourse = await Course.create({category, title, description, image });
    newCourse.offered = offered;
    newCourse.features = features;
    newCourse.reasons = reasons;
    newCourse.content = content;
    res.redirect('/courses');
  } catch (err) {
    console.log(err);
    next(err);
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

// if the role is admin example
// router.get("/editCourse/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).send({ error: "Invalid course ID" });
//     }
//     const course = await Course.findById(id);
//     if (!course) {
//       return res.status(404).send({ error: "Course not found" });
//     }
//     if (req.user.role !== "admin") {
//       return res.status(401).send({ error: "Unauthorized access" });
//     }
//     return res.render("course/editCourse", { course });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ error: "Server error" });
//   }
// });
router.post("/editCourse/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, image, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid course ID" });
    }

    const course = await Course.findByIdAndUpdate(id, {
      title,
      description,
      image,
      category
    });

    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    return res.redirect("/courses");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
