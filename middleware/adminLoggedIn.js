// module.exports = isLoggedIn = (req, res, next) => {
//     if (!req.session.currentUser) {
//       res.redirect("/auth/login");
//     } else {
//       next();
//     }
//   };

const isLoggedIn = (req, res, next) => {
    if(req.session.currentUser) {
        next();
    } else  {
        res.redirect("/auth/signup");
    }
    };

    // const isAdmin = (req, res, next) => {
    //     if (req.user.role === "admin") {
    //       next();
    //     } else {
    //       res.redirect("/auth/login");
    //     }
    //   };
      const isUser = (req, res, next) => {
        if (req.session.role === "user") {
          next();
        } else {
          res.redirect("/auth/login");
        }
      }
    module.exports = { isLoggedIn, isUser };
      // module.exports = { isAdmin, isLoggedIn, isUser };
