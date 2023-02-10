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
    const courses = await await Course.find({ active: true }).sort({
      title: 1,
    });
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
    const reviews = await Review.find({ course: id });
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
    res.render("course/newCourse", {
      offered,
      features,
      reasons,
      content,
      user,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    next(err);
  }
});

//@desc  edit course details  by Id
/* @route Post 
/* @access Admin*/
router.get("/editCourse/:id", (req, res) => {
  Course.findById(req.params.id)
    .populate("features")
    .populate("offered")
    .populate("content")
    .exec((err, foundCourse) => {
      if (err) return res.status(400).send(err);
      res.render("course/editCourse", { course: foundCourse });
    });
});


// SE BORRA CASI TODO
// router.post('/editCourse/:id', async (req, res) => {
//   try {
//     const { description, title, subdescription } = req.body;
//     const { id } = req.params;
//     const features = req.body.features ? req.body.features : [];
//     const content = req.body.content ? req.body.content : [];
//     const reasons = req.body.reasons ? req.body.reasons : [];
//     const offered = req.body.offered ? req.body.offered : [];

//     const editCourse = await Course.findByIdAndUpdate(
//       id,
//       { description, title, subdescription, offered, features, reasons, content },
//       { new: true }
//     );

//     // it redirects to the just edited course
//     res.redirect(`/course-details/${editCourse._id}`);
//   } catch (err) {
//     console.log(err);
//     res.redirect("/courses");
//   }
// });


// router.post('/editCourse/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     let update = {};

//     if (req.body.description) {
//       update.description = req.body.description;
//     }

//     if (req.body.title) {
//       update.title = req.body.title;
//     }

//     if (req.body.subdescription) {
//       update.subdescription = req.body.subdescription;
//     }

//     if (req.body.content) {
//       const content = await Content.findById(req.body.content);
//       content.update(req.body.content);
//     }

//     if (req.body.features) {
//       const features = await Features.findById(req.body.features);
//       features.update(req.body.features);
//     }

//     if (req.body.reasons) {
//       const reasons = await Reasons.findById(req.body.reasons);
//       reasons.update(req.body.reasons);
//     }

//     if (req.body.offered) {
//       const offered = await Offered.findById(req.body.offered);
//       offered.update(req.body.offered);
//     }

//     const editCourse = await Course.findByIdAndUpdate(
//       id,
//       update,
//       { new: true }
//     );
//     res.redirect(`/course-details/${editCourse._id}`);
//   } catch (err) {
//     console.log(err);
//     res.redirect("/courses");
//   }
// });


// router.post('/editCourse/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const course = await Course.findById(id);
//     const { description, title, subdescription } = req.body;

//     course.description = description;
//     course.title = title;
//     course.subdescription = subdescription;
    
//     if (req.body.offered) {
//       const offeredUpdates = req.body.offered.map(async (offer, index) => {
//         const offered = course.offered[index];
//         offered.value = offer.value;
//         return offered.save();
//       });
//       await Promise.all(offeredUpdates);
//     }

//     if (req.body.content) {
//       const contentUpdates = req.body.content.map(async (con, index) => {
//         const content = course.content[index];
//         content.value = con.value;
//         return content.save();
//       });
//       await Promise.all(contentUpdates);
//     }

//     if (req.body.features) {
//       const featuresUpdates = req.body.features.map(async (feature, index) => {
//         const features = course.features[index];
//         features.value = feature.value;
//         return features.save();
//       });
//       await Promise.all(featuresUpdates);
//     }

//     if (req.body.reasons) {
//       const reasonsUpdates = req.body.reasons.map(async (reason, index) => {
//         const reasons = course.reasons[index];
//         reasons.value = reason.value;
//         return reasons.save();
//       });
//       await Promise.all(reasonsUpdates);
//     }

//     await course.save();
//     res.redirect(`/course-details/${course._id}`);
//   } catch (err) {
//     console.log(err);
//     res.redirect("/courses");
//   }
// });


router.post("/editCourse/:id", async (req, res) => {
  try {
    const { description, title, subdescription } = req.body;
    const { id } = req.params;

    // Recupera el curso por su ID
    const course = await Course.findById(id);

    // Actualiza los datos del curso
    course.description = description;
    course.title = title;
    course.subdescription = subdescription;

    // Actualiza los modelos relacionados
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

    // Guarda los cambios
    await course.save();
    res.redirect("/courses");
    
  } catch (err) {
    console.log(err);
    res.redirect(`/course-details/${course._id}`);
  }
});


//@desc  remove course by id
/* @route Get 
/* @access Admin*/
router.post("/delete/:id", async (req, res) => {
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
