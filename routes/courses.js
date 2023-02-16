const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const Review = require("../models/Review");
const Content = require("../models/Content");
const Features = require("../models/Features");
const Offered = require("../models/Offered");
const Reasons = require("../models/Reasons");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
const { isLoggedIn, isUser, isAdmin } = require("../middleware/adminLoggedIn");

// @desc    Display all courses
// @route   GET /
// @access  SemiPublic (Can see part of the info)
router.get("/", async function (req, res, next) {
  const user = req.session.currentUser;
  try {
    const courses = await Course.find({ active: true }).sort({
      title: 1,
    });
    // it maps each course object and truncates its description property to show only the first 100 lines by splitting the string by newline characters and rejoining the first 100 lines.
    const truncatedCourses = courses.map((course) => {
      course.description = course.description
        .split("\n")
        .slice(0, 50)
        .join("\n");
      return course;
    });
    res.render("course/courseView", { courses: truncatedCourses, user });
  } catch (error) {
    next(error);
  }
});

// @desc    Search for course results
// @route   GET /search
// @access  Public
router.get("/search", async function (req, res, next) {
  const { title } = req.query;
  if (title.length > 0)
    try {
      const regex = new RegExp(title, "i");
      const course = await Course.find({ title: regex }).limit(10);
      res.render("course/search", { query: title, course });
    } catch (error) {
      next(error);
    }
});

//@desc     view course details  by Id
/* @route   GET 
/* @access  Public*/
router.get("/course-details/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = await req.session.currentUser;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid course ID" });
    }
    const review_user = await Review.find({
      course: id,
      username: user._id,
    }).populate("username");
    const reviews = await Review.find({
      course: id,
      username: { $ne: user._id },
    }).populate("username");
    const course = await Course.findById(id)
      .populate("offered")
      .populate("features")
      .populate("reasons")
      .populate("content");
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    for (let i = 0; i < course.features.length; i++) {
      course.features[i].svg = `/images/SVG/FEATURES/${i + 1}.svg`;
    }
    const enroled = await User.find({ _id: user._id, courses: id });
    // const isAdmin = user && user.role === "admin";
    console.log('userrrrr',user)
    return res.render("course/course-details", {
      course,
      user,
      reviews,
      review_user,
      enroled,
      isAdmin,
    });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
});

//@desc    create new course
/* @route  GET 
/* @access Admin*/
router.get("/newCourse", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const offered = await Offered.find().limit(1);
    const features = await Features.find().limit(1);
    const reasons = await Reasons.find().limit(1);
    const content = await Content.find().limit(1);
    const course = await Course.find().limit(1);
    console.log(course[0].title_why)
    res.render("course/newCourse", {
      course:course[0],
      offered:offered[0],
      features:features[0],
      reasons:reasons[0],
      conten:content[0],
      user:user[0],
    });
  } catch (err) {
    next(err);
  }
});
//@desc  create new course
/* @route Post 
/* @access Admin*/
router.post("/newCourse", async function (req, res, next) {
  const {
    category,
    title,
    description,
    image,
    offered,
    features,
    reasons,
    content,
  } = req.body;
  try {
    const newCourse = await Course.create({
      category,
      title,
      description,
      image,
    });
    newCourse.offered = offered;
    newCourse.features = features;
    newCourse.reasons = reasons;
    newCourse.content = content;
    res.redirect("/courses");
  } catch (err) {
    next(err);
  }
});

//@desc    add course to myaccount
/* @route  GET 
/* @access User*/
router.get("/addCourse/:courseId", isLoggedIn,isUser,  async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const user = req.session.currentUser;
    const user2 = await User.findByIdAndUpdate(user._id, {
      $push: { courses: ObjectId(courseId) },
    });
    res.redirect("/courses/myCourses");
  } catch (error) {
    next(error);
  }
});

//@desc     view courses in myaccount
/* @route   GET 
/* @access  especific User*/
router.get("/myCourses", isLoggedIn, isUser,  async (req, res, next) => {
  const user = req.session.currentUser;
  try {
    const courses = await User.findById(user._id).populate("courses");
    res.render("course/myCourses", { courses: courses.courses, user });
  } catch (error) {
    next(error);
  }
});

//@desc    edit course details  by Id
/* @route  GET
/* @access Admin*/
router.get("/editCourse/:id", isLoggedIn, isAdmin, (req, res) => {
  Course.findById(req.params.id)
    .populate("features")
    .populate("offered")
    .populate("content")
    .exec((err, foundCourse) => {
      if (err) return res.status(400).send(err);
      res.render("course/editCourse", { course: foundCourse });
    });
});

//@desc    edit course details  by Id
/* @route  POST 
/* @access Admin*/
router.post("/editCourse/:id",isLoggedIn, isAdmin,  async (req, res) => {
  try {
    const { description, title, subdescription } = req.body;
    const { id } = req.params;
    const course = await Course.findById(id);
    course.description = description;
    course.title = title;
    course.subdescription = subdescription;
    if (req.body.features) {
      course.features = [];
      for (let feature of req.body.features) {
        const foundFeature = await Features.findById(feature._id);
        if (foundFeature) {
          foundFeature.title = feature.title;
          foundFeature.description = feature.description;
          await foundFeature.save();
          course.features.push(foundFeature);
        }
      }
    }
    await course.save();
    res.redirect("/courses");
  } catch (err) {
    res.redirect(`/course-details/${course._id}`);
  }
});

//@desc    Remove course by id but it does not delete from User Account
/* @route  GET
// @access Admin*/
router.post("/delete/:id", isLoggedIn, isAdmin,  async (req, res) => {
 
  console.log(req);
  const course = await Course.findById(req.params.id);
  console.log('0. ', course);
  if (!course) {
    return res.status(404).send("No se encontró el curso.");
  }
  if (course.purchased) {
    return res
      .status(400)
      .send("No se puede borrar un curso que ha sido comprado.");
  }
  const user = req.session.currentUser;
  console.log('1.');
  try {
    const active = { active: false };
    // const isAdmin = user && user.role === "admin";
    const delete_course = true;
    console.log('2.');
    await Course.findByIdAndUpdate(req.params.id, active);
    const courses = await Course.find({ active: true }).sort({ title: 1 });
    console.log('3.', courses);
    const truncatedCourses = courses.map((course) => {
      course.description = course.description
        .split("\n")
        .slice(0, 100)
        .join("\n");
      return course;
    });
    console.log('4. ', truncatedCourses);
    res.render("course/courseView", {
      courses: truncatedCourses,
      user, 
      delete_course,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
