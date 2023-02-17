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


router.get('/', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.render('/admin', { users });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Error getting list of users' });
  }
});

router.post('/roles/:userId', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.role = req.body.role;
    await user.save();
    res.redirect('/auth/admin');
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Error changing user role' });
  }
});