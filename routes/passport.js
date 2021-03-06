//load bcrypt
var bCrypt = require("bcrypt-nodejs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
var moment = require("moment");

module.exports = function (user) {
  var User = user;

  //serialize
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function (id, done) {
    db.User.findByPk(id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // Sign Up --- takes input and checks if email already exists. If it exists it will return a message to user, if not it goes ahead with inputting the new user's information into the database
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        last_name: "last_name",
        first_name: "first_name",
        birthday: "birthday",
        zip: "zip",
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function (req, email, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
          where: {
            email: email
          }
        }).then(function (user) {
          if (user) {
            return done(null, false,
              req.flash(
                'info',
                "That email is already taken")
            );
          } else {
            var userPassword = generateHash(password);
            var data = {
              email: email,
              password: userPassword,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              zip: req.body.zip,
              birthday: req.body.birthday
            };

            //------------Age Verification-----------------
            var birthday = moment(req.body.birthday, "YYYY.MM.DD"),
              age = moment().diff(birthday, "years");
            console.log(age);
            if (age <= 20) {
              // ("You are not old enough");
              return done(null, false,
                req.flash(
                  'info',
                  "You are not old enough")
              );
            } else {
              User.create(data).then(function (newUser, created) {
                if (!newUser) {
                  return done(null, false);
                }
                if (newUser) {
                  return done(null, newUser);
                }
              });
            }
          }
        });
      }
    )
  );


  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email

        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function (req, email, password, done) {
        var User = user;

        var isValidPassword = function (userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: {
            email: email
          }
        })
          .then(function (user) {
            if (!user) {
              return done(null, false,
                req.flash(
                  'info',
                  "Email does not exist")
              );
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false,
                req.flash(
                  'info',
                  "Incorrect password.")
              );
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function (err) {
            console.log("Error:", err);

            return done(null, false,
              req.flash(
                'info',
                "Something went wrong with your Signin")
            );
          });
      }
    )
  );
};
