require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
// var PORT = process.env.PORT || 8080;
//-----------------------------------------------------------------//Authentication//----------------------------------------------------------
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(5000, function(err) {
  if (!err) console.log("Site is live");
  else console.log(err);
});

//Models
var models = require("./models");

//Sync Database
models.sequelize
  .sync({})
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

//For Handlebars
app.set("views", "./views");
app.engine(
  "handlebars",
  exphbs({
    extname: ".handlebars"
  })
);
app.set("view engine", "handlebars");

//-----------------------------------------------------------------//Authentication//----------------------------------------------------------

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Override form method POST with ?_method=PUT
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Routes
require("./routes/index-apiRoutes")(app);
require("./routes/index-htmlRoutes")(app);

//---------------------------------------------------------------------//Authentication//----------------------
//Routes
var authRoute = require("./routes/auth.js")(app,passport);

//load passport strategies
require('./config/passport/passport.js')(passport, models.User);

//-----------------------------------------------------------------------//Authentication//------------------------------------
var syncOptions = { force: false };

// If running a test, set syncOptions.force to truever
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync().then(function () {
//   app.listen(PORT, function () {
//     console.log("Server listening on: http://localhost:" + PORT);
//   });
// });

module.exports = app;
