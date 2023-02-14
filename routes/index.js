const Course = require("../models/Course");
const User = require("../models/User");
const router = require("express").Router();

// @desc    App home page
// @route   GET /
// @access  Public
router.get("/", (req, res, next) => {
  res.redirect("/courses");
});

router.get("/about", (req, res, next) => {
  const user = req.session.currentUser;
  res.render("about", { user } );
});

router.get("/terms_privacy", (req, res, next) => {
  res.render("terms_privacy");
});

module.exports = router;
