const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isLoggedIn = require("../middleware/isLoggedIn");

// @desc    is responsible for displaying the user's profile page.
// @route   GET /USER/PROFILE
// @access  Public

/*Get user PAGE*/
router.get("/profile", isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render("user/profile", { user });
});

// @desc  is responsible for displaying the user's profile editing page.
// @route   GET /profile/edit 
// @access  Public
/*Get edit page */
router.get("/profile/edit", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  res.render("user/profileEdit", { user });
});

// @desc is responsible for processing the data from the form submitted from the profile editing page.
// @route   POST /profile/edit 
// POST login route ==> to process form data
router.post("/profile/edit", isLoggedIn, async (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    res.render("user/profileEdit", { message: "Please provide a username." });
    return;
  }
  const user = req.session.currentUser;
  try {
    const userInDB = await User.findByIdAndUpdate(
      user._id,
      { username },
      { new: true }
    );
    req.session.currentUser = userInDB;
    res.render("user/profile", { user: userInDB });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
