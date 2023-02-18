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
  const isAdmin = user && user.role === "admin";
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
    res.render("course/courseView", {
      courses: truncatedCourses,
      isAdmin,
      user,
    });
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
    return res.render("course/course-details", {
      course,
      user,
      reviews,
      review_user,
      enroled,
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
    const content = await Content.find().limit(10);
    const reasons = await Reasons.find().limit(4);
    const course = await Course.findOne({
      title_why: "Why should you learn cybersecurity?",
    });
    res.render("course/newCourse", {
      course: course,
      offered: offered[0],
      features: features[0],
      reasons,
      content,
      user,
    });
  } catch (err) {
    next(err);
  }
});

//@desc  create new course
/* @route Post 
/* @access Admin*/
router.post("/newCourse", async function (req, res, next) {
  const course = {
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    list: req.body.list,
    image: req.body.image,
    skills: req.body.skills,
    title_why: req.body.title_why,
  };
  Object.keys(course).forEach((key) => {
    if (course[key] == "") {
      delete course[key];
    }
  });
  const offered = {
    logo: req.body.logo,
    place: req.body.place,
  };
  const contentobject = [
    {
      image: req.body.image_1,
      title: req.body.title_1,
      subtitle: req.body.subtitle_1,
      time: req.body.time_1,
      title_description: req.body.title_description_1,
      description_1: req.body.description_1_1,
      description_2: req.body.description_1_2,
      description_3: req.body.description_1_3,
      description_4: req.body.description_1_4,
    },
    {
      image: req.body.image_2,
      title: req.body.title_2,
      subtitle: req.body.subtitle_2,
      time: req.body.time_2,
      title_description: req.body.title_description_2,
      description_1: req.body.description_2_1,
      description_2: req.body.description_2_2,
      description_3: req.body.description_2_3,
      description_4: req.body.description_2_4,
    },
    {
      image: req.body.image_3,
      title: req.body.title_3,
      subtitle: req.body.subtitle_3,
      time: req.body.time_3,
      title_description: req.body.title_description_3,
      description_1: req.body.description_3_1,
      description_2: req.body.description_3_2,
      description_3: req.body.description_3_3,
      description_4: req.body.description_3_4,
    },
    {
      image: req.body.image_4,
      title: req.body.title_4,
      subtitle: req.body.subtitle_4,
      time: req.body.time_4,
      title_description: req.body.title_description_4,
      description_1: req.body.description_4_1,
      description_2: req.body.description_4_2,
      description_3: req.body.description_4_3,
      description_4: req.body.description_4_4,
    },
    {
      image: req.body.image_5,
      title: req.body.title_5,
      subtitle: req.body.subtitle_5,
      time: req.body.time_5,
      title_description: req.body.title_description_5,
      description_1: req.body.description_5_1,
      description_2: req.body.description_5_2,
      description_3: req.body.description_5_3,
      description_4: req.body.description_5_4,
    },
    {
      image: req.body.image_6,
      title: req.body.title_6,
      subtitle: req.body.subtitle_6,
      time: req.body.time_6,
      title_description: req.body.title_description_6,
      description_1: req.body.description_6_1,
      description_2: req.body.description_6_2,
      description_3: req.body.description_6_3,
      description_4: req.body.description_6_4,
    },
    {
      image: req.body.image_7,
      title: req.body.title_7,
      subtitle: req.body.subtitle_7,
      time: req.body.time_7,
      title_description: req.body.title_description_7,
      description_1: req.body.description_7_1,
      description_2: req.body.description_7_2,
      description_3: req.body.description_7_3,
      description_4: req.body.description_7_4,
    },
    {
      image: req.body.image_8,
      title: req.body.title_8,
      subtitle: req.body.subtitle_8,
      time: req.body.time_8,
      title_description: req.body.title_description_8,
      description_1: req.body.description_8_1,
      description_2: req.body.description_8_2,
      description_3: req.body.description_8_3,
      description_4: req.body.description_8_4,
    },
    {
      image: req.body.image_9,
      title: req.body.title_9,
      subtitle: req.body.subtitle_9,
      time: req.body.time_9,
      title_description: req.body.title_description_9,
      description_1: req.body.description_9_1,
      description_2: req.body.description_9_2,
      description_3: req.body.description_9_3,
      description_4: req.body.description_9_4,
    },
    {
      image: req.body.image_10,
      title: req.body.title_10,
      subtitle: req.body.subtitle_10,
      time: req.body.time_10,
      title_description: req.body.title_description_10,
      description_1: req.body.description_10_1,
      description_2: req.body.description_10_2,
      description_3: req.body.description_10_3,
      description_4: req.body.description_10_4,
    },
  ];
  contentobject.forEach(function (inside) {
    Object.keys(inside).forEach((key) => {
      if (inside[key] == "") {
        delete inside[key];
      }
    });
  });
  const content = contentobject.filter(
    (value) => Object.keys(value).length !== 0
  );
  const featuresobject = [
    {
      title: req.body.features_title_1,
      subtitle: req.body.features_subtitle_1,
    },
    {
      title: req.body.features_title_2,
      subtitle: req.body.features_subtitle_2,
    },
    {
      title: req.body.features_title_3,
      subtitle: req.body.features_subtitle_3,
    },
    {
      title: req.body.features_title_4,
      subtitle: req.body.features_subtitle_4,
    },
    {
      title: req.body.features_title_5,
      subtitle: req.body.features_subtitle_5,
    },
    {
      title: req.body.features_title_6,
      subtitle: req.body.features_subtitle_6,
    },
  ];
  featuresobject.forEach(function (inside) {
    Object.keys(inside).forEach((key) => {
      if (inside[key] == "") {
        delete inside[key];
      }
    });
  });
  const features = featuresobject.filter(
    (value) => Object.keys(value).length !== 0
  );
  const reasonsobject = [
    {
      subtitle: req.body.reasons_subtitle_1,
      list: req.body.reasons_list_1,
      description: req.body.reasons_description_1,
    },
    {
      subtitle: req.body.reasons_subtitle_2,
      list: req.body.reasons_list_2,
      description: req.body.reasons_description_2,
    },
    {
      subtitle: req.body.reasons_subtitle_3,
      list: req.body.reasons_list_3,
      description: req.body.reasons_description_3,
    },
    {
      subtitle: req.body.reasons_subtitle_4,
      list: req.body.reasons_list_4,
      description: req.body.reasons_description_4,
    },
  ];
  reasonsobject.forEach(function (inside) {
    Object.keys(inside).forEach((key) => {
      if (inside[key] == "") {
        delete inside[key];
      }
    });
  });
  const reasons = reasonsobject.filter(
    (value) => Object.keys(value).length !== 0
  );
  try {
    const new_course = await Course.create(course);
    //OFFERED
    const new_offered = await Offered.create(offered);
    //FEARURES
    const new_features = await Features.create(features);
    let features_ids = [];
    new_features.forEach((elem) => features_ids.push(`${elem.id}`));
    //CONTENT
    const new_content = await Content.create(content);
    let content_ids = [];
    new_content.forEach((elem) => content_ids.push(`${elem.id}`));
    //REASONS
    const new_reasons = await Content.create(content);
    let reasons_ids = [];
    new_reasons.forEach((elem) => reasons_ids.push(`${elem.id}`));
    //COMBINE
    await Course.findByIdAndUpdate(new_course._id, {
      $push: { offered: new_offered._id },
      features: features_ids,
      content: content_ids,
      reasons: reasons_ids,
    });
    res.redirect("/courses");
  } catch (err) {
    next(err);
  }
});

//@desc    add course to myaccount
/* @route  GET 
/* @access User*/
router.get("/addCourse/:courseId", isLoggedIn, async (req, res, next) => {
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
router.get("/myCourses", isLoggedIn, isUser, async (req, res, next) => {
  const user = req.session.currentUser;
  try {
    const courses = await User.findById(user._id).populate("courses");
    res.render("course/myCourses", { courses: courses.courses, user });
  } catch (error) {
    next(error);
  }
});

//@desc     view courses video
/* @route   GET 
/* @access  premium User*/
router.get("/viewMyCourses", isLoggedIn, isUser, (req, res, next) => {
  const data = {
    title: "Reproductor de YouTube",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    user: req.session.currentUser,
  };

  res.render("course/viewMyCourses", data);
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
router.post("/editCourse/:id", isLoggedIn, isAdmin, async (req, res) => {
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
router.post("/delete/:id", isLoggedIn, isAdmin, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send("No se encontró el curso.");
  }
  if (course.purchased) {
    return res
      .status(400)
      .send("No se puede borrar un curso que ha sido comprado.");
  }
  const user = req.session.currentUser;
  try {
    const active = { active: false };
    const delete_course = true;
    await Course.findByIdAndUpdate(req.params.id, active);
    const courses = await Course.find({ active: true }).sort({ title: 1 });
    const truncatedCourses = courses.map((course) => {
      course.description = course.description
        .split("\n")
        .slice(0, 100)
        .join("\n");
      return course;
    });
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
