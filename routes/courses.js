const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const Review = require("../models/Review");
const Content = require("../models/Content");
const Features = require("../models/Features");
const Offered = require("../models/Offered");
const Reasons = require("../models/Reasons");
const { isLoggedIn, isUser } = require("../middleware/adminLoggedIn");

// @desc    App courses page, GET ALL COURSES
// @route   GET /
// @access  SemiPublic (Can see part of the info)
router.get("/", async function (req, res, next) {
  const user = req.session.currentUser;
  try {
    const courses = await (await Course.find({active: true }).sort({ title: 1 }));
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
router.get("/course-details/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const { username } = req.session.currentUser;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid course ID" });
    }
    const reviews = await Review.find({course: id});
    const course = await Course.findById(id)
      .populate("offered")
      .populate("features")
      .populate("reasons")
      .populate("content");
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
//@desc  create new course  
/* @route Get 
/* @access Admin*/
router.get("/newCourse", async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const offered = await Offered.find();
    const features = await Features.find();
    const reasons = await Reasons.find();
    const content = await Content.find();
    res.render("course/newCourse", { offered, features, reasons, content, user });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
//@desc  create new course  
/* @route Post 
/* @access Admin*/
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

//@desc  edit course details  by Id
/* @route Post 
/* @access Admin*/
router.get('/editCourse/:id', (req, res) => {
  Course.findById(req.params.id, (err, foundCourse) => {
    if (err) return res.status(400).send(err);
    res.render("course/editCourse", { course: foundCourse });
  });
});

// Ruta POST para actualizar los campos de un curso NO FUNCIONA SOLO MODIFICA LOS PARAMETROS DEL MODELO CURSO
router.post('/editCourse/:id', (req, res) => {
  Course.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCourse) => {
    if (err) return res.status(400).send(err);
    res.redirect("/courses");
  });
});
//@desc  remove course by id 
/* @route Get 
/* @access Admin*/
router.post('/delete/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send('No se encontró el curso.');
  }
  if (course.purchased) {
    return res.status(400).send('No se puede borrar un curso que ha sido comprado.');
  }
  const user = req.session.currentUser
  try {
  const active = {active: false }
  const delete_course = true
  await Course.findByIdAndUpdate(req.params.id, active)
  const courses = await Course.find({active: true }).sort({ title: 1 });
    const truncatedCourses = courses.map((course) => {
      course.description = course.description
        .split("\n")
        .slice(0, 100)
        .join("\n");
      return course;
    });
    res.render("course/courseView", { courses: truncatedCourses, user,  delete_course});
  } catch (error) {
    next(error)
  }
});


module.exports = router;
