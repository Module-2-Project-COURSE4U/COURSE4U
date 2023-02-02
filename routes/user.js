const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isLoggedIn = require("../middleware/isLoggedIn");

// @desc    is responsible for displaying the user's profile page.
// @route   get /profile
// @access  Public

/*Get user PAGE*/
router.get("/profile", isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render("user/profile", { user });
});

// @desc  is responsible for displaying the user's profile editing page.
// @route   get /profile/edit
// @access  Public
/*Get edit page */
router.get("/profile/edit", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  res.render("user/profileEdit", { user });
});

// @desc is responsible for processing the data from the form submitted from the profile editing page.
// @route   post /profile/edit
// Post login route ==> to process form data
// router.post("/profile/edit",isLoggedIn, async (req, res, next) => {
//   const { username,  password1, password2  } = req.body;
//   const user = req.session.currentUser;

//   if (!username || !password1 || !password2 ) {
//     res.render("user/profileEdit", { user });
//     // { message: "Please provide all fields." });
//     return;
//   }

//   const regexPassword =
//   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
//   if (!regexPassword.test(password1)) {
//     res.render("user/profileEdit", { user });
//     // res.render("user/profileEdit", {
//     //   error:
//     //   'Password needs to contain at lesat 7 characters, one number, one lowercase an one uppercase letter.',});
//     return;
//   }
//   if (!regexPassword.test(password2)) {
//     res.render("user/profileEdit", { user });
//     // res.render("/user/profileEdit", {
//     //   error: "the password does not match",
//     // });
//     return;
//   }

//   if (!password1 === password2) {
//     res.render("user/profileEdit", { user });
//     // res.render("user/profileEdit", {
//     //   error: "Doublecheck the password on both fields",
//     // });
//     return;
//   }

//   const userId = req.session.currentUser._id;
//   try {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password1, salt);
//     const userInDB = await User.findByIdAndUpdate(
//      {_id: userId },
//       { username,  hashedPassword },
//       { new: true }
//     );
//     req.session.currentUser = userInDB;
//     res.redirect("/user/profile");
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/profile/edit", isLoggedIn, async (req, res, next) => {
  const { currentPassword, newPassword1, newPassword2 } = req.body;
  const user = req.session.currentUser;

  if (!currentPassword || !newPassword1 || !newPassword2) {
    res.render("user/profileEdit", {
      user,
      message: "Please provide all fields.",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    user.hashedPassword
  );
  if (!isPasswordValid) {
    res.render("user/profileEdit", {
      user,
      message: "Current password is incorrect.",
    });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
  if (!passwordRegex.test(newPassword1)) {
    res.render("user/profileEdit", {
      user,
      message:
        "Password must contain at least 7 characters, one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  if (newPassword1 !== newPassword2) {
    res.render("user/profileEdit", {
      user,
      message: "New passwords do not match.",
    });
    return;
  }
  const userId = req.session.currentUser._id;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword1, salt);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { hashedPassword },
      { new: true }
    );
    req.session.currentUser = updatedUser;
    res.redirect("/user/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
