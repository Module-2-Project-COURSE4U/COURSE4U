const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const isLoggedIn = require("../middleware/isLoggedIn");

// @desc    is responsible for displaying the user's profile page.
// @route   GET /USER/PROFILE
// @access  Public

/*Get user PAGE*/
router.get("/profile",  (req, res, next) => {
  const user = req.session.currentUser;
  res.render("user/profile", { user });
});

// @desc  is responsible for displaying the user's profile editing page.
// @route   GET /profile/edit 
// @access  Public
/*Get edit page */
router.get("/profile/edit",  (req, res, next) => {
  const user = req.session.currentUser;
  res.render("user/profileEdit", { user });
});

// @desc is responsible for processing the data from the form submitted from the profile editing page.
// @route   POST /profile/edit 
// POST login route ==> to process form data
router.post("/profile/edit", async (req, res, next) => {
  const { username,  password1, password2  } = req.body;

  if (!username || !password1 || !password2 ) {
    res.render("user/profileEdit", { message: "Please provide all fields." });
    return;
  }

  const regexPassword =
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
  if (!regexPassword.test(password1)) {
    res.render("user/profileEdit", {
      error:
      'Password needs to contain at lesat 7 characters, one number, one lowercase an one uppercase letter.',
    });
    return;
  }
  if (!regexPassword.test(password2)) {
    res.render("/user/profileEdit", {
      error: "the password does not match",
    });
    return;
  }

  if (!password1 === password2) {
    res.render("user/profileEdit", {
      error: "Doublecheck the password on both fields",
    });
    return;
  }

  const userId = req.session.currentUser._id;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password1, salt);
    const userInDB = await User.findByIdAndUpdate(
     {_id: userId },
      { username,  hashedPassword },
      { new: true }
    );
    req.session.currentUser = userInDB;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, "public/images/");
//   },
//   filename: function (req, file, cb) {
//   cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//   },
//   });
  
//   const upload = multer({ storage: storage });
  
//   router.post("/profile", upload.single("profile"), async (req, res) => {
//   try {
//   const user = await User.findById(req.user._id);
//   user.profilePicture = '/images/${req.file.filename}';
//   await user.save();
//   res.redirect("/profile");
//   } catch (error) {
//   console.error(error);
//   res.redirect("/user/profile");
//   }
//   });


module.exports = router;
