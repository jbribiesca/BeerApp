require("dotenv").config();

var express = require("express");
var exphbs = require("express-handlebars");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");

var db = require("./models");
var PORT = process.env.PORT || 8080;

// Middleware
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Flash middleware for messages
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 3600000 } }));
app.use(flash());

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set("views", "./views");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: ".handlebars"
  })
);
app.set("view engine", "handlebars");

var hbs = require("handlebars");
hbs.registerHelper("addStars", function(value) {
  var accum = "";
  var tmpVal = 5 - value;
  for (i = 0; i < value; i++) {
    accum +=
      "<li class='star selected' title='BURP!' data-value='5'><i class='fas fa-beer'></i></li>";
  }
  for (i = 0; i < tmpVal; i++) {
    accum +=
      "<li class='star' title='BURP!' data-value='5'><i class='fas fa-beer'></i></li>";
  }
  return new hbs.SafeString(accum);
});



// Routes
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/passport.js")(db.User);

var syncOptions = { force: false};
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Sync Database
db.sequelize
  .sync(syncOptions)
  .then(function() {
    app.listen(PORT, function(err) {
      if (!err) {
        console.log("Server listening on: http://localhost:" + PORT);
      } else {
        console.log(err);
      }
    });
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

module.exports = app;
