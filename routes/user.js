const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { isAdmin, isLoggedIn, isUser } = require('../middleware/adminLoggedIn');
const fileUploader = require("../config/cloudinary.config");

// @desc    is responsible for displaying the user's profile page.
// @route   get /profile
// @access  Public
router.get("/profile", isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render("user/profile", { user });
});

// @desc  is responsible for displaying the user's profile editing page.
// @route   get /profile/edit
// @access  Public
router.get("/profile/edit", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  res.render("user/profileEditPass", { user });
});
// @desc This route allows a user to change their password. It verifies that the password fields are valid and then updates the user's password in the database. It then redirects the user to their profile page.
// @route   post /profile/edit
// Post login route ==> to process form data
router.post("/profile/edit", isLoggedIn, async (req, res, next) => {
  const { currentPassword, newPassword1, newPassword2 } = req.body;
  const user = req.session.currentUser;

  if (!currentPassword || !newPassword1 || !newPassword2) {
    res.render("user/profileEditPass", {
      user,
      message: "Please provide all fields.",
    });
    return;
  }

  if (currentPassword === newPassword1 || currentPassword === newPassword2) {
    res.render("user/profileEditPass", {
      user,
      message: "New password must be different from the current password.",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    user.hashedPassword
  );
  if (!isPasswordValid) {
    res.render("user/profileEditPass", {
      user,
      message: "Password must contain at least 7 characters, one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
  if (!passwordRegex.test(newPassword1)) {
    res.render("user/profileEditPass", {
      user,
      message:
        "Password must contain at least 7 characters, one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  if (newPassword1 !== newPassword2) {
    res.render("user/profileEditPass", {
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

// @desc  is responsible for displaying the user's profile editing page.
// @route   get /profile/editPhoto
// @access  Public
router.get("/profile/editPhoto", function (req, res, next) {
  const user = req.session.currentUser;
  res.render("user/profileEditPhoto", { user }); 
});

// @desc  This route allows the user to edit their profile picture.
// @route   post /profile/editPhoto
// @access  User
router.post("/profile/editPhoto",fileUploader.single("imageUrl"),
  async (req, res, next) => {
    if (!req.file) {
      // console.log("No file was uploaded.");
      res.render("/user/profile", { error: "there is no file" }); //it renders a page for the user to select an image to upload.
      return;
    }
    const user = req.session.currentUser;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { imageUrl: req.file.path },
        { new: true } //it processes the uploaded image and saves it to the database
      );
      req.session.currentUser = updatedUser;
      res.redirect("/user/profile"); //it redirects the user to their profile with the new photo.
    } catch (error) {
      next(error);
    }
  }
);

// @desc  This route allows the user to delete their profile picture.
// @route   Get /user/profile/deletePhoto
// @access  User
router.get("/profile/deletePhoto", async (req, res, next) => {
  const user = req.session.currentUser;
  console.log('it works')
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { imageUrl: "https://cdn-icons-png.flaticon.com/512/720/720236.png" },
      { new: true }
    );
    console.log("DELETE PIC", updatedUser);
    req.session.currentUser = updatedUser;
    res.redirect("/user/profile");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
