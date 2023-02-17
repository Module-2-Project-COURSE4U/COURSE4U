const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { ObjectId } = require("mongodb");
const { isLoggedIn, isUser, isAdmin } = require("../middleware/adminLoggedIn");
const Course = require("../models/Course");
const passport = require("passport");
const session = require("express-session");


// @desc    Displays form view to sign up
// @route   Get/auth/signup
// @access  Public
router.get("/signup", async (req, res, next) => {
  res.render("auth/signup");
});

// @desc    Displays form view to sign up
// @route   Get/auth/signup
// @access  Public
router.get("/signup&subscribe", async (req, res, next) => {
  res.render("auth/signup", { subscribe: true });
});

// @desc    Sends user auth data to database to create a new user
// @route   Post /auth/signup
// @access  Public
router.post("/signup", async (req, res, next) => {
  const {
    email,
    password,
    username,
    subscribe
  } = req.body;
  // Check that username, email, and password are provided
  if (
    !username ||
    !password 
  ) {
    res.render("auth/signup", { error: "All fields are necessary!" });
    return;
  }
  const findEmailInDB = await User.findOne({ email: email });
  if (findEmailInDB) {
    res.render("auth/signup", {
      error: `There already is a user with email ${email}`,
    });
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
  if (!regex.test(password)) {
    res.render("auth/signup", {
      error:
        "Password needs to contain at least 7 characters, one number, one lowercase an one uppercase letter.",
    });
    return;
  }
  try {
    const findUserInDB = await User.findOne({ username: username });
    if (findUserInDB) {
      res.render("auth/signup", {
        error: `There alredy is a user with username ${username}`,
      });
      return;
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      req.session.isUserLoggedIn = true;
const first_user = true
if(subscribe=='YES'){
  res.render('auth/checkout', { user, first_user })
}
else{
  res.render("auth/login", { user, first_user });
}
}
} catch (err) {
next(err);
}
});
// @desc    Displays form view to log in
// @route   Get /auth/login
// @access  Public
router.get("/login", async (req, res, next) => {
  res.render("auth/login");
});

// @desc    Sends user auth data to database to authenticate user
// @route   Post /auth/login
// @access  Public
/* POST log in view. */
router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.render("auth/login", {
      error: "Please introduce email and password to log in",
    });
    return;
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.render("auth/login", {
        error: `There are no users by ${username}`,
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (passwordMatch) {
        req.session.currentUser = user;
        res.redirect("/courses");
      } else {
        res.render("auth/login", { error: "incorrect password" });
        return;
      }
    }
  } catch (error) {
    next(error);
  }
});


// @desc    Destroy user session and log out
// @route   Post /auth/checkout
// @access  Private/ use
router.get("/checkout", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser
  res.render('auth/checkout', { user });
});

router.post('/checkout', async function (req, res, next) {
    const { expiryDate, cardNumber, cvv, cardholderName, username } = req.body;
    let user
    if(!req.session.currentUser){
      user = await User.findOne({ username: username });
    }
    else{
      user = req.session.currentUser
    }
   // Validating the credit card details
    if (cardNumber.length != 16) {
      return res.render('auth/checkout',  { error: 'Please enter 16 numbers!' , user, courseId});
    }
    if (expiryDate.length != 4) {
      return res.render("auth/checkout", { error: 'The expiration year must be between 2023 and 2048!' , user, courseId});
    }
    if (cvv.length != 3) {
      return res.render('auth/checkout', { error: 'Please enter 3 numbers for The CVV!', user, courseId });
    }
  try {
      const usertrue = await User.findByIdAndUpdate(user._id, { $set: { isPremiumMember: true } }, { new: true });
      req.session.currentUser = usertrue
        // Redirect the user to their account page
      res.redirect('/');      
    } catch (error) {
      return next(error);
    }
  });
// @desc    Displays google login view
// @route   Get /google
// @access  Public
router.get("/google",  passport.authenticate("google", { scope: ["profile"] }));
// @desc    Authenticate the user with Passport, retrieve the user from the database
// @route   GET /googleisLoggedIn, isUser/callback
// @access  Public
router.get(
  "/google/callback",  
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  async function (req, res, next) {
    try {
      const user = await User.findOne({ username: req.user.username });
      req.session.currentUser = user;
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
);


// @desc    Destroy user session and log out
// @route   Post /auth/logout
// @access  Private/ user
router.get("/logout", (req, res, next) => {
  const user = req.session.currentUser;
  res.render("auth/logout", { user });
});

//@desc    Destroy user session and log out
//@route   POST /auth/logout
//@access  Private/ user
router.post("/logout", (req, res, next) => {
  const submit = req.body.submit;
  try {
    if (submit === "YES") {
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        } else {
          res.clearCookie("course4u-cookie");
          res.redirect("/auth/login");
        }
      });
    } else if (submit === "NO") {
      res.redirect("/user/profile");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
