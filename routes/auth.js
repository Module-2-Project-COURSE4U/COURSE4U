const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { ObjectId } = require("mongodb");
const { isLoggedIn, isUser } = require("../middleware/adminLoggedIn");
// const { simulatePaymentProcessing } = require("./checkoutPay");
const Course = require("../models/Course");

// @desc    Displays form view to sign up
// @route   Get/auth/signup
// @access  Public
router.get("/signup", async (req, res, next) => {
  // const user = req.session.currentUser;
  res.render("auth/signup");
});

// @desc    Sends user auth data to database to create a new user
// @route   Post /auth/signup
// @access  Public
router.post("/signup", async (req, res, next) => {
  const {
    email,
    password,
    username,
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
        hashedPassword,
      
      });
      req.session.isUserLoggedIn = true;
const first_user = true
res.render("auth/login", { user, first_user });
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
        // res.render("user/profile", { user });
        res.redirect("/courses");
      } else {
        console.log("password");
        res.render("auth/login", { error: "incorrect password" });
        return;
      }
    }
  } catch (error) {
    next(error);
  }
});

//google login
// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email"
//     ]
//   })
// );
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/private-page",
//     failureRedirect: "/" // here you would redirect to the login page using traditional login approach
//   })
// );

// @desc    Destroy user session and log out
// @route   Post /auth/checkout
// @access  Private/ use
  
router.get("/checkout/:courseId", isLoggedIn, (req, res, next) => {
  const course = req.params;
  res.render('auth/checkout', course );
});   

// ROUTE POST CHECKOUT *******************************
router.post('/checkout/:courseId', async function (req, res, next) {
  // Simulate payment processing
  // try {
  //   await simulatePaymentProcessing();
  // } catch (error) {
  //   return next(error);
  // }
  let foundCourse = null;
  try {

    const courseId = req.params.courseId;
    const { expiryDate, cardNumber, cvv, cardholderName } = req.body;
    const user = req.session.currentUser;
    console.log("BBBBBBBBBBBBBBBBBBBBBBBB", cvv);
  
    // Validating the credit card details
    if (cardNumber.length != 16) {
  
      return res.render('auth/checkout',  { error: 'Please enter 16 numbers!' });
    }
    if (expiryDate.length != 4) {
      return res.render("auth/checkout", { error: 'The expiration year must be between 2023 and 2048!' });
    }
    if (cvv.length != 3) {
     
      return res.render('auth/checkout', { error: 'Please enter 3 numbers for The CVV!' });
    }
    foundCourse = await User.findOne({ course: ObjectId(courseId) });
    console.log("-----------------------------------BBBBBBBBBBB", foundCourse);
  } catch (error) {
    return next(error);
  }
  if (!foundCourse) 
 {
    try {
      await User.findByIdAndUpdate(user._id, { $push: { courses: ObjectId(courseId) }, $set: { isPremiumMember: 
        true } });
        console.log("-----------------------------------BBBBBBBBBBB", courseId);
    } catch (error) {
      return next(error);
    }
  }
      // Redirect the user to their account page
      res.redirect('/course/myCourses');
    });




// @desc    Destroy user session and log out
// @route   Post /auth/logout
// @access  Private/ user
router.get("/logout", (req, res, next) => {
  res.render('auth/logout');
});

//@desc    Destroy user session and log out
//@route   Post /auth/logout
//@access  Private/ user
router.post("/logout", (req, res, next) => {
  const submit = req.body.submit;
  try{
    if(submit === "YES"){
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        } else {
          res.clearCookie("course4u-cookie");
          console.log('cookie cleared')
          res.redirect("/auth/login");
        }
      })
    }
    else if(submit === "NO"){
      res.redirect('/user/profile')
    }
  }
  catch (err) {
    next(err);
  }
})

module.exports = router;
