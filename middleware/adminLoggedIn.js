const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/signup");
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.currentUser.role === "admin") {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

const isUser = (req, res, next) => {
  if (req.session.currentUser.role === "user") {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = { isLoggedIn, isAdmin, isUser };
