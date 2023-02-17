require("dotenv").config();
require("./db");
const hbs = require("hbs");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./models/User");
const FacebookStrategy = require("passport-facebook").Strategy;

// Routers require
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const coursesRouter = require("./routes/courses");
const reviewsRouter = require("./routes/reviews");
const checkoutRouter = require("./routes/checkout");
const mongoose = require("mongoose");
const passport = require("passport");
const { randomUUID } = require("crypto");
mongoose.set("strictPopulate", false);
const app = express();

// cookies and loggers
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

// For deployment
app.set("trust proxy", 1);
app.use(
  session({
    name: "course4u-cookie",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 2592000000, // 30 days in milliseconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:

      User.findOne({ googleID: profile.id })
        .then((user) => {
          if (user) {
            done(null, user);
            return;
          }
          
          User.create({
            googleID: profile.id,
            username: profile.displayName,
            email: randomUUID() + "@gmail.com",
            hashedPassword: "1234567890",
          })
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => done(err)); // closes User.create()
        })
        .catch((err) => done(err)); // closes User.findOne()
    }
  )
);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
// that takes in a string and a length and returns a truncated version of the string, limited to the specified length.
hbs.registerHelper("truncate", function (str, length) {
  return str.slice(0, length);
});
hbs.registerHelper('isAdmin', function (value) {
  return value == 'admin';
});
hbs.registerHelper('isUser', function (value) {
  return value == 'user';
});
hbs.registerHelper("Math", function(lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
      
  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});
hbs.registerHelper("Order", function(value) {
   return {
      '0': 'First',
      '1': 'Second',
      '2': 'Third',
      '3': 'Fourth',
      '4': 'Fifth',
      '5': 'Sixth',
      '6': 'Seventh',
      '7': 'Eighth',
      '8': 'Nineth',
      '9': 'Tenth'
  }[value];
});


// routes intro
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/courses", coursesRouter);
app.use("/reviews", reviewsRouter);
app.use("/checkout", checkoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  if (err.status === 404) {
    res.render("404", { path: req.url });
  } else {
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
