var db = require("../models");
var passport = require("passport");
var flash = require('connect-flash');

module.exports = function(app) {

  // GET Routes

  // Load index page
  app.get("/", function (req, res) {
    res.render("index", { user: req.user });
  });

   // Render user Sign Up page 
  app.get("/signup", function (req, res) {
    let flashMessage = { messages: req.flash("info")[0]}
    console.log(req.flash('info')[0]);
    res.render("signup", flashMessage);
  });

   // Render user Sign In page 
  app.get("/signin", function (req, res) {
    let flashMessage = { messages: req.flash("info")[0]}
    console.log(req.flash('info')[0]);
    res.render("signin", flashMessage);
  });

   // Render dashboard page
  app.get("/dashboard", isLoggedIn, function(req, res) {
    db.Review.findAll({
      include: [
        {
          all: true,
          nested: true
        }
      ]
    }).then(function(dbReview) {
      console.log(dbReview);
      res.render("dashboard", {
        reviews: dbReview
      });
    });
  });
  
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  // POST Routes
  
  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup",
    failureFlash: false
  })
  );

  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin",
    failureFlash: false
  })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  };

};
