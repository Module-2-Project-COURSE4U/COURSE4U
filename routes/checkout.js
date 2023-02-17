const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isLoggedIn, isUser, isAdmin } = require("../middleware/adminLoggedIn");
const Course = require("../models/Course");
const session = require("express-session");

// @desc    Destroy user session and log out
// @route   Post /auth/checkout
// @access  Private/ use
router.get("/", isLoggedIn, (req, res, next) => {
    const user = req.session.currentUser
    res.render('auth/checkout', { user });
  });
  

// @desc    Destroy user session and log out
// @route   Post /auth/checkout
// @access  Private/ use
router.post('/', async function (req, res, next) {
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

    module.exports = router;