require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Override form method POST with ?_method=PUT
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Routes
// require("./routes/index-apiRoutes")(app);
// require("./routes/index-htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});

module.exports = app;
